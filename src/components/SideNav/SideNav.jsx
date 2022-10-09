import React from "react";
import Button from "../Button/Button";
import "./SideNav.css";

const SideNav = ({ show = false, showEvent, menuButtons = [] }) => {
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
              <p className="overflow-ellipsis">Carlos Castro</p>
              <span>Usuario</span>
            </div>
            <Button name="Cerra sesion" />
          </div>
        </div>
        <div>
          {menuButtons.map(({ name, route }) => (
            <Button
              name={name}
              key={name}
              onClickEvent={() => {
                console.log(route);
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
