import Promo from "../Promo/Promo.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutMe from "../AboutMe/AboutMe.jsx";
import Portfolio from "../Portfolio/Portfolio.jsx";
import NavTab from "../NavTab/NavTab.jsx";

import { useRef } from "react";

const Main = () => {
  const refs = {
    aboutProject: useRef(null),
    techs: useRef(null),
    student: useRef(null),
  };

  const handleButtonClick = (e) => {
    const name = e.target.attributes.name.value;
    const element = refs[name].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main className="content">
      <Promo>
        <NavTab handleButtonClick={handleButtonClick} />
      </Promo>
      <AboutProject ref={refs.aboutProject} />
      <Techs ref={refs.techs} />
      <AboutMe ref={refs.student} />
      <Portfolio />
    </main>
  );
}

export default Main;
