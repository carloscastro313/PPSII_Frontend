import React from "react";

const Modal = ({ children, show, zIndex = "z-10" }) => {
  return (
    <div
      className={`w-full h-full fixed bg-black bg-opacity-80 backdrop-blur-sm ${
        !show && "hidden"
      } ${zIndex}`}
    >
      {children}
    </div>
  );
};

export default Modal;
