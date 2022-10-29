import React from "react";
import Button from "../Button/Button";

const ButtonColor = ({
  color = "",
  hover = "",
  colorText = "text-white",
  padding = "py-2",
  textPosition = "text-center",
  name,
  onClickEvent,
}) => {
  return (
    <>
      <Button
        cssClass={`${color} ${hover} ${colorText} ${padding} ${textPosition} rounded transition-colors`}
      />
    </>
  );
};

export default ButtonColor;
