import { Link, useLocation } from "react-router-dom";
import React, { useRef } from "react";

import logo from "../../images/logo.svg";


const Header = ({ isAuth }) => {
  const menuRef = useRef();
  const location = useLocation();
  const path = location.pathname;

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
      <Link to="/">
        <img src={logo} alt="Логотип" />
      </Link>
      {isAuth ? (
        <nav className="header__navigate header__navigate-movies">
          <ul className="header__movies" ref={menuRef}>
            <button className="header__burger-close" onClick={handleCloseMenu}></button>
            <li className={`header__movies-item ${path === "/" && "header__movies-item_selected"}`}>
              <Link to="/" className="header__link" onClick={handleCloseMenu}>
                Главная
              </Link>
            </li>
            <li className={`header__movies-item ${path === "/movies" && "header__movies-item_selected"}`}>
              <Link to="/movies" className="header__link" onClick={handleCloseMenu}>
                Фильмы
              </Link>
            </li>
            <li
              className={`header__movies-item ${path === "/saved-movies" && "header__movies-item_selected"}`}>
              <Link to="/saved-movies" className="header__link" onClick={handleCloseMenu}>
                Сохранённые фильмы
              </Link>
            </li>
            <li className="header__movies-item">
              <Link
                to="/profile"
                className="header__link-profile"
                onClick={handleCloseMenu}
              >
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
