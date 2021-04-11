import React from "react";
import styled from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";

const ImgDiv = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: 15;

  border: 3px solid black;
  /* padding: 3px; */
  /* background-color: rgb(52, 52, 52); */
  background-color: white;

  /* center */
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;

  /* sizing */
  max-width: 78vw;
  max-height: 65vh;
  padding: 3px;
`;

const EnlargedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImgCloseIcon = styled.div`
  position: absolute;
  right: 0;
`;

const ImgEnlarged = ({ imgUrl, scrollPosition, setEnlargeImgUrl, setBlur }) => {
  // set window.postiony to scrollPosition on image close
  const handleImgClose = () => {
    // set image url in the UserProfile to null and it will close the img
    setEnlargeImgUrl(null);
    // scroll to the position user left
    window.scrollTo(0, scrollPosition);

    setBlur(false);
  };
  return (
    <ImgDiv>
      <ImgCloseIcon onClick={handleImgClose}>
        <CancelIcon />
      </ImgCloseIcon>
      <EnlargedImg src={imgUrl} alt="enlarged image" />
    </ImgDiv>
  );
};

export default ImgEnlarged;
