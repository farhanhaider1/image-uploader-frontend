import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import { useRef } from "react";

//* div is a box
const MainDivSearchBar = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;
const SearchBarDiv = styled.div`
  display: flex;
  border-radius: 90px;
  width: 60vw;
  height: 40px;
  align-items: center;
  background-color: black;
  color: white;
`;

const IconDiv = styled.div`
  margin-left: 30px;
`;
const InputDiv = styled.div``;

const Form = styled.form`
  margin-left: 20px;
  margin-bottom: 3px;
  width: 1100%;
`;

const Input = styled.input`
  outline: none;
  background-color: black;
  width: 80%;
  border: none;
  color: white;
  font-size: 15px;
  ::placeholder {
    color: #c6c6c6;
    opacity: 1; /* Firefox */
    font-size: 15px;
  }
`;

//* SearchBar equals the function which calls the function itself
const SearchBar = () => {
  const [SearchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {}, []);

  //* everytime someone puts in a text it saves that input
  const handleChange = () => {
    //* sets the text state
    setSearchText(searchInputRef.current.value);
  };
  return (
    <MainDivSearchBar>
      <SearchBarDiv>
        <IconDiv>
          <BsSearch />
        </IconDiv>
        <Form>
          <InputDiv>
            <Input
              type={"text"}
              ref={searchInputRef}
              placeholder={"Search"}
              onChange={handleChange}
              value={SearchText}
            />
          </InputDiv>
        </Form>
      </SearchBarDiv>
    </MainDivSearchBar>
  );
};

export default SearchBar;
