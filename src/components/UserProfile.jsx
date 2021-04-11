import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "../components/Image";
import ImgEnlarged from "./ImgEnlarged";
import axios from "axios";
import NoPosts from "./NoPosts";

const UserMainDiv = styled.div``;

const UserProfileStyled = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;

  ${({ blur }) =>
    blur !== false
      ? css`
          filter: blur(20px);
        `
      : css`
          filter: blur(0px);
        `}

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 500px) {
    flex-direction: row;
  }
  @media (min-width: 2000px) {
    max-width: 2000px;
    justify-content: center;
    margin: 0 10%;
  }
`;

const UserProfile = () => {
  //todo --> upload imgs to s3
  //todo --> save key in mongoDb
  //todo --> create signed url and fill state with real urls on useEffect
  const [imgUrls, setImgUrls] = useState([]);

  // ? url passes as a prop to Img_Enlarged comp
  const [enlargeImgUrl, setEnlargeImgUrl] = useState(null);
  // ? save the last scroll position, when user closes enlarged postion take them
  // ? back to the image location aka where they left
  const [scrollPosition, setScrollPosition] = useState();
  // ? used to blur background once Img_Enlarged comp mounts
  const [blur, setBlur] = useState(false);

  const { isLoggedin, username } = useSelector((state) => state.users);

  const history = useHistory();
  useEffect(() => {
    if (isLoggedin) {
      axios
        .get("http://localhost:9000/users/posts", {
          params: { username: username },
        })
        .then((res) => setImgUrls(res.data))
        .catch((err) => console.log(err.message));
    } else {
      history.push("/signin");
    }
  }, []);

  return (
    <UserMainDiv>
      <UserProfileStyled blur={blur}>
        {imgUrls &&
          imgUrls.map((url) => (
            <Image
              key={url}
              url={url}
              setEnlargeImgUrl={setEnlargeImgUrl}
              setScrollPosition={setScrollPosition}
              setBlur={setBlur}
            />
          ))}
      </UserProfileStyled>
      {enlargeImgUrl && (
        <ImgEnlarged
          setBlur={setBlur}
          setEnlargeImgUrl={setEnlargeImgUrl}
          imgUrl={enlargeImgUrl}
          scrollPosition={scrollPosition}
        ></ImgEnlarged>
      )}
      {imgUrls.length === 0 && <NoPosts />}
    </UserMainDiv>
  );
};

export default UserProfile;
