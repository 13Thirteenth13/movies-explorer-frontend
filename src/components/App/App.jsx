import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import Footer from "../Footer/Footer.jsx";

import { useLocation, Routes, Route } from "react-router-dom";
import { Login, Register } from "../Auth";
import { useState } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const location = useLocation();
  const path = location.pathname;
  const onAuth = path === "/sign-in" || path === "/sign-up";
  return (
    <div className="page">
      {!onAuth && <Header isAuth={isAuth} />}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>

      {!onAuth && <Footer />}
    </div>
  );
}

export default App;
