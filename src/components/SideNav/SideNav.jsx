import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import Button from "../Button/Button";
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
      <aside className="w-72 bg-white SideNavAnimation">
        <div className="bg-blue-700 h-20">
          <div className="flex p-3 justify-between">
            <div>
              <p className="overflow-ellipsis">
                {usuario && `${usuario.nombre} ${usuario.apellido}`}
              </p>
              <span>{usuario && usuario.tipo}</span>
            </div>
            <Button name="Cerra sesion" onClickEvent={() => signOut()} />
          </div>
        </div>
        <div>
          <Button
            name="Inicio"
            onClickEvent={() => {
              navigate("/");
            }}
            cssClass="bg-transparent w-full hover:bg-blue-200"
          />
          {menuButtons.map(({ name, route }) => (
            <Button
              name={name}
              key={name}
              onClickEvent={() => {
                navigate(route);
              }}
              cssClass="bg-transparent w-full hover:bg-blue-200"
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
