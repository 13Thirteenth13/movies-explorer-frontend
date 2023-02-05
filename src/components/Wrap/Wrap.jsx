import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { wrapPT } from "../../utils/propTypes";


const Wrap = ({ children, header = true, footer = true }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {header && <Header />}
      {children}
      {path !== "/profile" && footer && <Footer />}
    </>
  );
};

Wrap.propTypes = wrapPT;

export default Wrap;
