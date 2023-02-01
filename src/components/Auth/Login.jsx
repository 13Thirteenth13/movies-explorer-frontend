import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { onLogin } from "../../services/actions/user.js";
import { useStore } from "../../services/StoreProvider.js";
import Input from "../Input/Input.jsx";

const Login = ({ success }) => {
  const [state, dispatch] = useStore();
  const loggedIn = state.loggedIn;
  const [error, setError] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  };

  useEffect(() => {
    loggedIn && navigate("/");
  }, [loggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(dispatch, formData, state);
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
