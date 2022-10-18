import React from "react";

const Modal = ({ children, show }) => {
  return (
    <div
      className={`w-full h-full fixed bg-black bg-opacity-80 ${
        !show && "hidden"
      } z-50`}
    >
      {children}
    </div>
  );
};

export default Modal;
