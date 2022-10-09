import React from "react";

const Button = ({
  onClickEvent,
  name,
  cssClass = "bg-blue-600 hover:bg-blue-500 text-white",
}) => {
  return (
    <button
      onClick={() => onClickEvent()}
      className={`${cssClass} py-2 min-w-[100px] text-center rounded transition-colors`}
    >
      {name}
    </button>
  );
};

export default Button;
