import { useState } from "react";

const Input = ({ title, onChange, name, type = "text", error }) => {
  const requiredProps =
    type === "text" ? { minLength: 2, maxLength: 30, required: true } : null;

  return (
    <label className="auth__input-label">
      {title}
      <input
        name={name}
        type={type}
        className={`auth__input ${error && "auth__color_error"}`}
        onChange={onChange}
        {...requiredProps}
      ></input>
      <span className={`auth__error ${error && "auth__error_visible"}`}>
        {error}
      </span>
    </label>
  );
}

export default Input;
