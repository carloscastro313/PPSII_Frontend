import React from "react";

const IconButton = ({
  children,
  onClickEvent,
  cssClass = "bg-blue-600 hover:bg-blue-400 text-white",
}) => {
  return (
    <button
      onClick={onClickEvent}
      className={`${cssClass} p-3 rounded-full transition-colors`}
    >
      {children}
    </button>
  );
};

export default IconButton;
