import React from "react";
import { useContext } from "react";
import { BiDoorOpen } from "react-icons/bi";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import "./SideNav.css";

const SideNav = ({ show = false, showEvent, menuButtons = [] }) => {
  const { signOut, usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      className={`fixed z-10 w-full h-full bg-black bg-opacity-80 ${
        show ? "flex" : "hidden"
      }`}
      onClick={() => showEvent(!show)}
    >
      <aside className="w-72 bg-primary SideNavAnimation flex flex-col justify-between h-full">
        <div>
          <div className="bg-white h-20">
            <div className="flex p-3 justify-between">
              <div>
                <p className="overflow-ellipsis">
                  {usuario && `${usuario.Nombre} ${usuario.Apellido}`}
                </p>
                <p className="first-letter:uppercase">
                  {usuario && usuario.TipoUsuario}
                </p>
              </div>
              <div>
                <IconButton
                  onClickEvent={() => signOut()}
                  cssClass="bg-black bg-opacity-40 hover:bg-opacity-60"
                >
                  <BiDoorOpen className="text-2xl" />
                </IconButton>
              </div>
              {/* <Button
                name="Cerrar sesión"
                onClickEvent={}
                cssClass="bg-blue-600 hover:bg-blue-400 text-white p-1"
              /> */}
            </div>
          </div>

          <div>
            <Button
              name="Inicio"
              onClickEvent={() => {
                navigate("/");
              }}
              cssClass="bg-transparent w-full hover:bg-blue-200 text-white"
            />
            {menuButtons.map(({ name, route }) => (
              <Button
                name={name}
                key={name}
                onClickEvent={() => {
                  navigate(route);
                }}
                cssClass="bg-transparent w-full hover:bg-blue-200 text-white"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row h-12 w-full gap-6 p-2 justify-center">
          <a
            href="https://www.instagram.com/codeutnfra/?next=%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram className="text-white text-3xl hover:text-pink-500" />
          </a>
          <a
            href="https://twitter.com/utnfra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitter className="text-white text-3xl hover:text-cyan-400" />
          </a>
          <a
            href="https://www.youtube.com/@UTNRegionalAvellaneda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsYoutube className="text-white text-3xl hover:text-red-600" />
          </a>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
