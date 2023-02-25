const Input = ({ title, onChange, name, type = "text", error }) => {
  const requiredProps =
  type === "text"
    ? { minLength: 2, maxLength: 30 }
    : type === "password"
      ? { minLength: 5 }
      : null;

  return (
    <label className="input-label">
      {title}
      <input
        name={name}
        type={type}
        className={`input ${error && "input__color_error"}`}
        onChange={onChange}
        {...requiredProps}
      ></input>
      <span className={`input__error ${error && "input__error_visible"}`}>
        {error}
      </span>
    </label>
  );
}

export default Input;
