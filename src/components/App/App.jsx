import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";

import { useLocation, Routes, Route } from "react-router-dom";
import { Login, Register } from "../Auth";

const App = () => {
  const location = useLocation();
  const path = location.pathname;
  const isAuth = path === "/sign-in" || path === "/sign-up";
  return (
    <div className="page">
      {!isAuth && <Header />}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>

      {!isAuth && <Footer />}
    </div>
  );
}

export default App;
