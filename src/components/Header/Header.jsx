import { Link } from "react-router-dom";
import './Header.css';
import logo from "../../images/header_logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" />
      <nav className="header__links">
        <Link to="/sign-up" className="header__link text_medium-primary">
          Регистрация
        </Link>
        <Link to="/sign-in" className="header__link color_primary text_medium-primary">
          Войти
        </Link>
      </nav>
    </header>
  );
}

export default Header;