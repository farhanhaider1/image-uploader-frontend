import React, { useEffect, useState } from "react";
import { FaRegGrinHearts, FaGrinHearts } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

const MainDivImageFeed = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow: hidden;
  margin-right: 6%;
  margin-left: 6%;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: solid #aaa8a8 1px;
  height: ${(props) => props.height};
`;

const UserInfo = styled.div`
  margin-bottom: 8px;
  color: #515151;
`;

const ImgDiv = styled.div`
  overflow: hidden;
  width: 90vw;
  /*  used to get a perfect square even on resize */
  height: ${(props) => props.height};
  max-width: 400px;
  max-height: 400px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BtnsDiv = styled.div`
  display: flex;
  margin-top: 10px;
  .likebtn {
    margin-right: 20px;
    margin-left: 10px;
  }
  .icon {
    font-size: 20px;
  }
`;

const NumsDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const FeedImage = ({ name, imgUrl }) => {
  const [LikesNum, setLikesNum] = useState(1);
  const [Liked, setLiked] = useState(false);
  const [imgHeight, setImgHeight] = useState();

  useEffect(() => {
    setImgHeight(calImgDivHeight());
  }, []);

  // ! used to keep img a perfect square
  const calImgDivHeight = () => {
    const height = window.innerWidth;
    return height + "px";
  };
  const resize = () => {
    setImgHeight(calImgDivHeight());
  };
  //? call resize() on window resize
  window.addEventListener("resize", resize);

  //!

  const handleLike = () => {
    setLiked(!Liked);
    // * if liked increase num of likes by 1 else decrese
    if (!Liked) {
      setLikesNum(LikesNum + 1);
    } else {
      setLikesNum(LikesNum - 1);
    }
  };
  return (
    <MainDivImageFeed height={imgHeight}>
      <UserInfo>
        <h5>{"@" + name}</h5>
      </UserInfo>
      <ImgDiv onDoubleClick={handleLike}>
        <img src={imgUrl} alt={`image posted by `} />
      </ImgDiv>
      <BtnsDiv>
        <div className={"likebtn"} onClick={handleLike}>
          {Liked ? (
            <FaGrinHearts className={"icon"} />
          ) : (
            <FaRegGrinHearts className={"icon"} />
          )}
          <NumsDiv>
            <p>{LikesNum}</p>
          </NumsDiv>
        </div>
        <div>
          <AiOutlineComment className={"icon"} />
          <NumsDiv>
            <p>19</p>
          </NumsDiv>
        </div>
      </BtnsDiv>
    </MainDivImageFeed>
  );
};

export default FeedImage;
