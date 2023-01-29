import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "../Input/Input.jsx";

const Login = () => {
  const [error, setError] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section className="auth">
      <img src={logo} alt="Логотип" className="auth__logo" />
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
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
        <button className="auth__submit">Войти</button>
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
