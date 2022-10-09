import React from "react";
import Button from "../Button/Button";

const Header = ({ showEvent, isLog = true }) => {
  return (
    <header className="flex bg-blue-500 px-3">
      {isLog && (
        <Button
          onClickEvent={() => showEvent(true)}
          name="Menu"
          cssClass="bg-orange-500 hover:bg-orange-400 my-auto"
        />
      )}
      <a href="#" className="absolute left-2/4 top-3">
        UTN
      </a>
    </header>
  );
};

export default Header;
