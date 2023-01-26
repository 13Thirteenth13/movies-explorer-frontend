import { Link, useLocation } from "react-router-dom";
import React, { useRef } from "react";

import './Header.css';
import logo from "../../images/logo.svg";


const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  const menuRef = useRef();

  const handleOpenMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "flex";
  };

  const handleCloseMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "";
  };

  return (
    <header className="header">
      <img src={logo} alt="Логотип" />

      {path === "/movies" || path === "/saved-movies" ? (
        <nav className="header__navigate header__navigate-movies">
          <ul className="header__movies" ref={menuRef}>
            <li className="header__movies-item">
              <button
                className="header__burger-close"
                onClick={handleCloseMenu}>
              </button>
              <Link to="/movies" className="header__link">
                Фильмы
              </Link>
            </li>
            <li className="header__movies-item">
              <Link to="/saved-movies" className="header__link">
                Сохранённые фильмы
              </Link>
            </li>
            <li className="header__movies-item">
              <Link to="/profile" className="header__link-profile">
                Аккаунт
              </Link>
            </li>
          </ul>
          <div className="header__burger" onClick={handleOpenMenu}>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
          </div>
        </nav>
      ) : (
        <nav className="header__navigate">
          <ul className="header__auth">
            <li className="header__auth-item">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__auth-item">
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
