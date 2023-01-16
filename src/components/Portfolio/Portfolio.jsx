import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item portfolio__underline">
          <a
            className="portfolio__link"
            href="https://github.com/13Thirteenth13/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <img src={arrow} alt="Иконка стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item portfolio__underline">
          <a
            className="portfolio__link"
            href="https://github.com/13Thirteenth13/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img src={arrow} alt="Иконка стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/13Thirteenth13/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img src={arrow} alt="Иконка стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
