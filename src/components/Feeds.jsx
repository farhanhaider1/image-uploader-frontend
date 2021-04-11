import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import FeedImage from "./FeedImage";
import { useHistory } from "react-router";

const MainDivFeed = styled.div`
  font-family: "Poppins", sans-serif;
`;

const ImagesDiv = styled.div`
  margin-top: 20px;
`;

const imgArray = [
  "https://images.unsplash.com/photo-1617365564485-d2786503d6ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
  "https://images.unsplash.com/photo-1617449745486-17b1e4e99424?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1617365564485-d2786503d6ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=638&q=80",
  "https://images.unsplash.com/photo-1617419086540-518c5b847b88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1611095566888-f1446042c8fc?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
  "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1617427259147-877161eef990?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1617386405547-33eb8671fef8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
  "https://images.unsplash.com/photo-1617376262647-cd57aa3ba413?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1617375407336-acbd58ca1e6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

const Feeds = () => {
  const { isLoggedin } = useSelector((state) => state.users);
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedin) history.push("signin");
  }, []);
  return (
    <MainDivFeed>
      <SearchBar />
      <ImagesDiv>
        {imgArray.map((url) => (
          <FeedImage name={"farhan"} imgUrl={url} key={url} />
        ))}
      </ImagesDiv>
    </MainDivFeed>
  );
};

export default Feeds;
