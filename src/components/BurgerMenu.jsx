import React from "react";
import { IoExit } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { GoInfo } from "react-icons/go";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/user";

const MainDivMenu = styled.div`
  position: absolute;
  min-height: 95vh;
  width: 80vw;
  right: 0px;
  background-color: black;
  z-index: 1000;
  font-family: "Poppins", sans-serif;
`;
const MenuListDiv = styled.div`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin-left: 15px;
  cursor: pointer;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  p {
    margin: 10px;
  }
`;

const BurgerMenu = ({ setShowBurgerMenu }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(logOutUser());
    setShowBurgerMenu(false);
    history.replace("/");
  };

  const handleAccount = () => {
    setShowBurgerMenu(false);
    history.push("posts");
  };
  return (
    <MainDivMenu>
      <MenuListDiv>
        <ListItem onClick={handleAccount}>
          <VscAccount />
          <p>Account</p>
        </ListItem>
        <ListItem>
          <BiSupport />
          <p>Contact Support</p>
        </ListItem>
        <ListItem onClick={handleSignOut}>
          <IoExit />
          <p>Sign Out</p>
        </ListItem>
        <ListItem>
          <GoInfo />
          <p>About</p>
        </ListItem>
      </MenuListDiv>
    </MainDivMenu>
  );
};

export default BurgerMenu;
