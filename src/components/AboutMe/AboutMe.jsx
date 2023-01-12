function AboutMe() {
  return (
    <section className="about">
      <h2 className="about__header text_large-secondary underline-pb25">Кот</h2>
      <div className="about__info">
        <div className="about__info-description">
          <h3 className="about__info-title text_large-primary">Оззи</h3>
          <p className="about__info-subtitle">Поглотитель корма класса "Холистик"</p>
          <p className="about__info-description text_medium-secondary">
            Привет! Меня зовут Оззи (да, да, в&#160;честь того кто на&#160;концерте откусил голову летучей мыши).
            Мне 4&#160;года, как очень успешный кот живу в&#160;Москве с&#160;матерью (ее&#160;зовут Росси кстати).
            Собственно уже исходя из&#160;истории решения дать мне такое имя можно судить и&#160;о&#160;решении хозяина
            освоить фронтенд разработку в&#160;2к22 году 😀 Но&#160;все&#160;же он&#160;начал свой путь и&#160;уже работает
            над дипломом где разместил мое мнение об&#160;этом мероприятии. Хозяин проводит много времени лежа за&#160;ноутбуком,
            обложившись книгами и&#160;блокнотами. Я&#160;очень поддерживаю хозяина, лежа у&#160;него на&#160;ногах.
            Отсюда большой плюс, так как не&#160;нужно воевать с&#160;Росси за&#160;место на&#160;батарее. Но&#160;есть
            и&#160;минус в&#160;том чтобы его отвлечь когда хочется поесть то&#160;нужно приложить немало усилий! Но&#160;все
            таки хорошо что хозяин рядом и&#160;надеюсь что благодаря учебе в&#160;Я.Практикуме он&#160;сможет больше времени
            работать за&#160;ноутбуком и&#160;реже куда то&#160;уезжать!
          </p>
          <ul className="about__links text_medium-primary">
            <li>
              <a href="/#" className="about__link">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="/#" className="about__link">
                Telegram
              </a>
            </li>
            <li>
              <a href="/#" className="about__link">
                Почта
              </a>
            </li>
            <li>
              <a href="/#" className="about__link">
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about__info-image"
          src="https://i.ibb.co/mcng9Xs/IMG-20220408-175102-1.jpg"
          alt="Фотография котов"
        />
      </div>
    </section>
  );
}

export default AboutMe;
