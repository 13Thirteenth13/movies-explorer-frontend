import { inputPT } from "../../utils/propTypes.js";

const Input = ({ title, onChange, name, type, error, disabled }) => {
  const requiredProps =
    type === "text"
      ? { minLength: 2, maxLength: 30 }
      : type === "password"
        ? { minLength: 3 }
        : null;

  return (
    <label className="input-label">
      {title}
      <input
        name={name}
        type={type}
        className={`input ${error && "input__color_error"}`}
        onChange={onChange}
        disabled={disabled}
        required
        {...requiredProps}
      ></input>
      <span className={`input-error ${error && "input-error_visible"} input__color_error`}>{error}</span>
    </label>
  );
};

Input.propTypes = inputPT;

export default Input;
