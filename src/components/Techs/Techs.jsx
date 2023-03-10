import { forwardRef } from "react";

const Techs = forwardRef((props, ref) => {
  return (
    <section className="techs color_background" id="techs" ref={ref}>
      <h2 className="techs__title techs__underline">Технологии</h2>
      <div className="techs__info">
        <h3 className="techs__info-title">7 технологий</h3>
        <p className="techs__info-text">
          На курсе веб&#8209;разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  );
});

export default Techs;
