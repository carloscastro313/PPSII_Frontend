import React from "react";

const Input = ({
  type = "text",
  label,
  id,
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col px-3">
      <label
        htmlFor={id}
        className="text-lg pl-1 first-letter:uppercase text-white"
      >
        {label}
      </label>
      <input
        className="p-2 rounded text-black"
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
