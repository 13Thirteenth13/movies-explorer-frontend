import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../Input/Input.jsx";

const Register = (props) => {
  const { onRegister } = props;

  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [isValidForm, setIsValidForm] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value
    }));
    setError((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.validationMessage
    }));
    setIsValidForm(e.target.closest('form').checkValidity())
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(value, setApiError);
  };

  return (
    <div className="auth">
      <Link to="/" className="auth__logo-container">
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input
            name="name"
            title="Имя"
            value={value.name}
            onChange={handleChange}
            error={error.name}
          />
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            error={error.email}
          />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
            error={error.password}
          />
        </div>
        <span className="auth__form__error">{apiError}</span>
        <button className="auth__submit" type="submit" disabled={!isValidForm}>Зарегистрироваться</button>
      </form>
      <div className="auth__link-container">
        <p className="auth__link-text">Уже зарегестрированны?</p>
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
