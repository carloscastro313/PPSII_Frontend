import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import IconButton from "../IconButton/IconButton";
import { BsList } from "react-icons/bs";

const Header = ({ showEvent, isLog = true }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <header className="flex justify-between bg-primary px-3">
      {usuario != null && (
        <IconButton
          onClickEvent={() => showEvent(true)}
          cssClass="bg-black bg-opacity-40 hover:bg-opacity-60 my-auto"
        >
          <BsList className="text-white text-2xl" />
        </IconButton>
      )}
      {usuario != null ? (
        <Link to="/" className="logo ">
          <img src="/logoutnwhite.png" alt="logo"></img>
        </Link>
      ) : (
        <div className="logo">
          <img src="/logoutnwhite.png" alt="logo"></img>
        </div>
      )}
      {usuario && (
        <div
          className={`my-auto ${getBg(
            usuario.TipoUsuario
          )} text-white p-2 rounded hidden sm:block`}
        >
          <p className="text-white first-letter:uppercase">
            {usuario.TipoUsuario}
            {getEmoticon(usuario.TipoUsuario)}
          </p>
        </div>
      )}
    </header>
  );
};

const getEmoticon = (TipoUsuario) => {
  switch (TipoUsuario) {
    case "administrador":
      return "🕵🏼";
    case "secretaria":
      return "🖋️";
    case "docente":
      return "🍎";
    case "alumno":
      return "📚";
    default:
      break;
  }
};

const getBg = (TipoUsuario) => {
  switch (TipoUsuario) {
    case "administrador":
      return "bg-red-700";
    case "secretaria":
      return "bg-green-700";
    case "docente":
      return "bg-orange-700";
    case "alumno":
      return "bg-blue-700";
    default:
      break;
  }
};

export default Header;
