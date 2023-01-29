import { forwardRef } from "react";
import cats from "../../images/cats.jpg"

const AboutMe = forwardRef((props, ref) => {
  return (
    <section className="about" id="student" ref={ref}>
      <h2 className="about__header about__underline">Кот</h2>
      <div className="about__info">
        <div className="about__info-description">
          <h3 className="about__info-title">Оззи</h3>
          <p className="about__info-subtitle">Утилизатор корма</p>
          <p className="about__info-text">
            В&#160;свои 4&#160;года я&#160;живу в&#160;нерезиновой, подтянув сюда и&#160;свою мать,
            за&#160;счёт которой лихорадочно самоутверждаюсь и&#160;доминирую.
            Но&#160;это лирика. Мой самый амбициозный кейс&#160;&#8212; это кожаный мешок с&#160;костями,
            которому я&#160;позволяю убирать за&#160;собой лоток, заполненный переваренным кормом класса &#171;холистик&#187;.
            В&#160;2к22&#160;я вынудил его освоить фронтенд-разработку, так как мое чрево не&#160;привыкло к&#160;вискасу,
            а&#160;пушистый зад к&#160;желтой бумаге газет.
          </p>
          <p className="about__info-text">
            Я&#160;трачу всё свободное время на&#160;сдерживание человека за&#160;ноутом, на&#160;котором лежу и&#160;прею,
            бока не&#160;жалею. Да, иногда мой мочевой пузырь раздувается до&#160;размеров Техаса,
            но&#160;я&#160;всё равно не&#160;встаю. Эти мучения довели моего кожаного до&#160;Диплома.
            Я&#160;этим горжусь и&#160;уверен, что благодаря Я.Практикум мне не&#160;придется булить мать,
            объедая ее&#160;или, и&#160;того хуже, дежуря под столом, когда кожаные поглощают пищу.
          </p>
          <ul className="about__links">
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=79032555800"
                className="about__link"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://t.me/Red_Skittles"
                className="about__link"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="mailto:79032555800@ya.ru"
                className="about__link"
                target="_blank"
                rel="noreferrer"
              >
                Почта
              </a>
            </li>
            <li>
              <a
                href="https://github.com/13Thirteenth13"
                className="about__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about__info-image"
          src={cats}
          alt="Фотография котов"
        />
      </div>
    </section>
  );
});

export default AboutMe;
