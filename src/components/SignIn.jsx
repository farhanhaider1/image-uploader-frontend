import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logInSuccessful, logInFailed } from "../store/user";
import Toast from "./Toast";

const FormDiv = styled.div`
  background-color: rgb(0, 0, 0);
  height: 95vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  transform: translateY(-10%);
`;

const Input = styled.input`
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
`;
const LogInBtn = styled.input`
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
  cursor: pointer;
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
const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logInFailed());
  }, []);

  const history = useHistory();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };
  //

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (login === "" || password === "") return;

    //* axios to see if user exists
    try {
      const res = await axios.get("http://localhost:9000/users/auth", {
        params: {
          username: login,
          password: password,
        },
      });
      console.log(res.data);

      if (res) {
        const userInfo = {
          username: res.data.username,
          name: res.data.name,
        };
        setLogin("");
        setpassword("");
        // * set redux to is logged in
        dispatch(logInSuccessful(userInfo));
        // * redirect user to feeds
        history.push("/feed");
      }
    } catch (error) {
      if (error.response) {
        setErrors({ text: error.response.data, type: "error" });
      } else {
        // other sever errors
        setErrors({ text: "sever error", type: "error" });
        console.log("catched", error.response);
      }
      dispatch(logInFailed());
    }
  };
  return (
    <FormDiv>
      {errors && <Toast text={errors.text} type={errors.type} error={errors} />}
      <Form>
        <Input
          type="text"
          value={login}
          placeholder={"Username"}
          onChange={handleLoginChange}
        />
        <Input
          type="password"
          value={password}
          placeholder={"Password"}
          onChange={handlePasswordChange}
        />
        <LogInBtn type="submit" value="Log In" onClick={handleSubmit} />
      </Form>
      <SignUpLink>
        Don’t have an account?
        <span>
          <Link to="/signup" style={{ color: "red" }}>
            Sign Up
          </Link>
        </span>
      </SignUpLink>
    </FormDiv>
  );
};

export default SignIn;
