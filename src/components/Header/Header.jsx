import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import IconButton from "../IconButton/IconButton";
import { BsList } from "react-icons/bs";

const Header = ({ showEvent, isLog = true }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <header className="flex bg-blue-500 px-3">
      {usuario != null && (
        <IconButton
          onClickEvent={() => showEvent(true)}
          cssClass="bg-blue-600 hover:bg-blue-400 my-auto"
        >
          <BsList />
        </IconButton>
      )}
      {usuario != null ? (
        <Link to="/" className="absolute left-2/4 top-3">
          UTN
        </Link>
      ) : (
        <p className="absolute left-2/4 top-3">UTN</p>
      )}
    </header>
  );
};

export default Header;
