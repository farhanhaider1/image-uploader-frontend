import React from "react";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import styled from "styled-components";

const MainDiv = styled.div`
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const CamIconDiv = styled.div`
  text-align: center;
`;
const TextDiv = styled.div`
  text-align: center;
  p {
    font-size: 30px;
  }
`;
const NoPosts = () => {
  return (
    <MainDiv>
      <CamIconDiv>
        <CameraEnhanceIcon style={{ fontSize: "100px" }} />
      </CamIconDiv>
      <TextDiv>
        <p>No uploads yet!</p>
      </TextDiv>
    </MainDiv>
  );
};

export default NoPosts;
