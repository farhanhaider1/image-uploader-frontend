import React from "react";
import styled from "styled-components";
import CameraIcon from "@material-ui/icons/Camera";
import "../App.css";
import { Link } from "react-router-dom";

const MainHome = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  height: 88vh;
`;
const HeadingDiv = styled.div`
  text-align: center;
  margin: 10% 5%;
  font-size: 30px;
`;
const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btnDiv {
    /* center Link vertically and horizontally in the div */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    height: 40px;
    width: 50vw;
    max-width: 274px;
    border-radius: 10px;
    background-color: black;
  }
  .btns {
    text-decoration: none;
    color: white !important;
    width: 100%;
    text-align: center;
  }
  @media (max-width: 400px) {
    .btnDiv {
      width: 80vw;
      max-width: 274px;
    }
  }
`;

const Home = () => {
  return (
    <MainHome>
      <HeadingDiv>
        <p>
          Share moments with BYTES community <CameraIcon fontSize={"default"} />
        </p>
      </HeadingDiv>
      <ButtonsDiv>
        <div className="btnDiv">
          <Link to={"/signup"} draggable className="btns">
            Create Account
          </Link>
        </div>
        <div className="btnDiv">
          <Link to={"/signin"} draggable className="btns">
            Sign In
          </Link>
        </div>
      </ButtonsDiv>
    </MainHome>
  );
};

export default Home;
