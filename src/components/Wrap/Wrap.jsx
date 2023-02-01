import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useLocation } from "react-router-dom";

const Wrap = ({ children, header = true, footer = true, loggedIn }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {header && <Header loggedIn={loggedIn} />}
      {children}
      {path !== "/profile" && footer && <Footer />}
    </>
  );
};

export default Wrap;
