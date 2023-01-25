import './Header.css';
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="header">
      <img src={logo} alt="Логотип" />

      {path === "/movies" ? (
        <nav className="header__navigate header__navigate-movies">
          <ul className="header__movies">
            <li className="header__movies-item">
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
