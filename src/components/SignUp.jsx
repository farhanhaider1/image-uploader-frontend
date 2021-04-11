import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormDiv = styled.div`
  background-color: rgb(0, 0, 0);

  height: 95vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormDivInner = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  transform: translateY(-10%);
  .error {
    border-left: red 20px solid;
  }
  .field {
    margin: 3%;
    width: 262px;
    height: 47px;
    border: none;
    border-radius: 15px;
    outline: none !important;
    padding-left: 30px;
    font-size: 16px;

    ::placeholder {
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: rgb(0, 0, 0);
    }
    @media (max-width: 400px) {
      width: 180px;
      height: 47px;
    }
    @media (max-width: 290px) {
      width: 120px;
      height: 47px;
    }
  }
`;

const LogInBtn = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none !important;
  width: 82px;
  height: 40px;
  margin-top: 15px;
  border: none;
  border-radius: 15px;
  background-color: white;
  text-align: center;
`;
const SignUpLink = styled.p`
  margin-top: 30px;
  padding-bottom: 10px;
  margin-left: -6px;
  color: rgb(128, 128, 128);
  transform: translateY(-10%);
  span {
    margin-left: 6px;
  }
`;

const SignUp = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }, [error]);

  const myValidation = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(2, "Min 2 character")
      .max(50, "Max 50 characters"),
    username: Yup.string()
      .required("Required")
      .min(5, "Min 5 characters")
      .max(50, "max 50 characters"),
    email: Yup.string().required("Required").email("Not a valid email"),
    password: Yup.string()
      .required("Required")
      .min(5, "Password must be at least 5 characters"),
  });

  const handleSubmit = async (values, setFieldValue) => {
    try {
      const res = await axios({
        url: "http://localhost:9000/users/new",
        method: "POST",
        data: values,
      });
      console.log(res.data);
    } catch (error) {
      console.log("error", error.response.data);
      setFieldValue("name", "");
      setError(error.response.data);
    }
  };
  return (
    <FormDiv>
      <Formik
        initialValues={{ name: "", username: "", email: "", password: "" }}
        onSubmit={(values, { setSubmitting, setFieldValue }) => {
          handleSubmit(values, setFieldValue);
          setSubmitting(false);
        }}
        validationSchema={myValidation}
      >
        {(props) => (
          <FormDivInner>
            {error && <div>{error}</div>}
            <Form>
              <div>
                <Field
                  className={"field"}
                  type="text"
                  name="name"
                  placeholder={"Name"}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div>
                <Field
                  className={"field"}
                  type="text"
                  name="username"
                  placeholder={"Username"}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div>
                <Field
                  className={"field"}
                  type="email"
                  name="email"
                  placeholder={"Email"}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div>
                <Field
                  className={"field"}
                  type="password"
                  name="password"
                  placeholder={"Password"}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <br />

              <LogInBtn
                type="submit"
                disabled={
                  Object.keys(props.values).length === 0 ||
                  Object.keys(props.errors).length > 0 ||
                  props.isSubmitting
                }
              >
                Submit
              </LogInBtn>
            </Form>
          </FormDivInner>
        )}
      </Formik>

      <SignUpLink>
        Have an account?
        <span>
          <Link to="/signin" style={{ color: "red" }}>
            Sign In
          </Link>
        </span>
      </SignUpLink>
    </FormDiv>
  );
};

export default SignUp;
