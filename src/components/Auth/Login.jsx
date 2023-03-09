import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../Input/Input.jsx";

const Login = (props) => {
  const { onLogin } = props;

  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
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
    onLogin(value, setApiError);
  };

  return (
    <section className="auth">
      <Link to="/" className="auth__logo-container">
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            error={error.email}
            pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
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
        <button
          className={`auth__submit ${!isValidForm && "auth__submit_color-disabled"}`}
          type="submit"
          disabled={!isValidForm}
        >
          Войти
        </button>
        <div className="auth__link-container">
          <p className="auth__link-text">Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="auth__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
