import React, { useState, useEffect } from "react";
import styled from "styled-components";

//? div containing imgs
const ImgDiv = styled.div`
  max-width: 33.1%;
  max-height: ${(props) => props.height};
  overflow: hidden;
  background-color: black;
  margin: 0.1px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: baseline;
  }
`;
const Image = ({ url, setEnlargeImgUrl, setScrollPosition, setBlur }) => {
  // ? add img div to resize when window resizes
  const [imgDivHeight, setimgDivHeight] = useState();

  useEffect(() => {
    setimgDivHeight(calImgDivHeight());
  }, []);

  const hanldeImgClick = (e) => {
    // update src of image to be enlarged
    setEnlargeImgUrl(e.target.src);

    // get postion of scroll on y axis
    const scrollPositionY = window.pageYOffset;
    //set scroll postion
    setScrollPosition(scrollPositionY);
    // scroll to top
    window.scrollTo(0, 0);
    setBlur(true);
  };
  const calImgDivHeight = () => {
    const height = window.innerWidth / 3;
    return height + "px";
  };
  const resize = () => {
    setimgDivHeight(calImgDivHeight());
  };
  window.addEventListener("resize", resize);
  return (
    <ImgDiv height={imgDivHeight} key={url} onClick={hanldeImgClick}>
      <img src={url} alt="" />
    </ImgDiv>
  );
};

export default Image;
