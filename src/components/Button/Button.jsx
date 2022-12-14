import React from "react";

const Button = ({
  onClickEvent,
  name,
  cssClass = "bg-blue-600 hover:bg-blue-400 text-white",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={() => {
        if (onClickEvent) onClickEvent();
      }}
      className={`${cssClass} py-2 min-w-[100px] text-center rounded transition-colors`}
    >
      {name}
    </button>
  );
};

export default Button;
