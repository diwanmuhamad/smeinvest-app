import React from "react";

const Button = ({ styles, text, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-[#B67465] shadow-md rounded-[10px] outline-none ${styles}`}
  >
    {text}
  </button>
);

export default Button;
