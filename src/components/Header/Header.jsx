import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import Button from "../Button/Button";

const Header = ({ showEvent, isLog = true }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <header className="flex bg-blue-500 px-3">
      {usuario != null && (
        <Button
          onClickEvent={() => showEvent(true)}
          name="Menu"
          cssClass="bg-orange-500 hover:bg-orange-400 my-auto"
        />
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
