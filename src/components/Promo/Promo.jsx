const Promo = ({ handleButtonClick }) => {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <nav>
        <ul className="promo__list">
          <li
            name="aboutProject"
            className="promo__list-item"
            onClick={handleButtonClick}
          >
            О проекте
          </li>
          <li
            name="techs"
            className="promo__list-item"
            onClick={handleButtonClick}
          >
            Технологии
          </li>
          <li
            name="techs"
            className="promo__list-item"
            onClick={handleButtonClick}
          >
            Студент
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Promo;
