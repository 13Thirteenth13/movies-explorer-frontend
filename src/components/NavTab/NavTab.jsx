const NavTab = ({ handleButtonClick }) => {
  return (
    <nav>
      <ul className="navtab__list">
        <li
          name="aboutProject"
          className="navtab__list-item"
          onClick={handleButtonClick}
        >
          О проекте
        </li>
        <li
          name="techs"
          className="navtab__list-item"
          onClick={handleButtonClick}
        >
          Технологии
        </li>
        <li
          name="student"
          className="navtab__list-item"
          onClick={handleButtonClick}
        >
          Студент
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
