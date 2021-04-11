import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
  const [userAvatarUrl, setUserAvatarUrl] = useState("null"); // using null as string on purpose so avatar shows alt text
  const { name, isLoggedin } = useSelector((state) => state.users);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const handleBurgerClick = () => {
    setShowBurgerMenu(!showBurgerMenu);
  };
  return (
    <div>
      <div className="header">
        {name && (
          <div className="avatar__header">
            <Avatar alt={name} src={userAvatarUrl} />
          </div>
        )}
        <div className="logo__header">
          <Link to={"/feed"} className="link__header">
            <h2>BYTES</h2>
          </Link>
        </div>
        {isLoggedin && (
          <div className="menu__header" onClick={handleBurgerClick}>
            {showBurgerMenu ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </div>
        )}
      </div>
      {isLoggedin && showBurgerMenu && (
        <div>{<BurgerMenu setShowBurgerMenu={setShowBurgerMenu} />}</div>
      )}
    </div>
  );
};

export default Header;
