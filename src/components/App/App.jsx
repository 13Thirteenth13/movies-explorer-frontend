import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import Footer from "../Footer/Footer.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import InfoToolTip from "../InfoToolTip/InfoToolTip.jsx";

import api from "../../utils/api.js";
import * as auth from "../../utils/auth.js";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });
  const [favoriteMovies, setFavoriteMOvies] = useState([]);
  const [infoToolTip, setInfoTooltip] = useState({
    message: "",
    isOpen: false,
    success: false
  });
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    api
      .getMovies()
      .then((movies) => {
        setMoviesList(movies);
        setFavoriteMOvies(movies.slice(0, 3));
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка в запросе фильмов! ${err}`,
          isOpen: true,
          success: false,
        });
      });
  }, []);

  const onClosePopup = () => {
    setInfoTooltip({ ...infoToolTip, isOpen: false });
  };

  const handleUpdateUser = (body) => {
    api
      .updateUser(body)
      .then((data) => {
        setUser({ ...user, ...data });
        setInfoTooltip({
          message: `Вы успешно изменили свои данные!`,
          isOpen: true,
          success: true,
        });
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка редактирования пользователя! ${err}`,
          isOpen: true,
          success: false,
        });
      });
  };

  const onLogin = (body) => {
    return auth
      .login(body)
      .then(({ token }) => {
        setIsAuth(true);
        setInfoTooltip({
          message: "Вы успешно вошли!",
          isOpen: true,
          success: true,
        });
        return true;
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка авторизации! ${err}`,
          isOpen: true,
          success: false,
        });
        return false;
      });
  };

  function onRegister(body) {
    return auth
      .register(body)
      .then((data) => {
        setUser({ ...user, ...data });
        setInfoTooltip({
          message: "Вы успешно зарегистрировались!",
          isOpen: true,
          success: true,
        });
        return true;
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка регистрации! ${err}`,
          isOpen: true,
          success: false,
        });
        return false;
      });
  };

  const Wrap = ({ children, header = true, footer = true }) => {
    return (
      <>
        {header && <Header isAuth={isAuth} />}
        {children}
        {footer && <Footer />}
      </>
    );
  };

  return (
    <div className="page">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Wrap>
              <Main />
            </Wrap>
          }
        />
        <Route
          path="/movies"
          element={
            <Wrap>
              <Movies moviesList={moviesList} loading={loading} />
            </Wrap>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Wrap>
              <SavedMovies moviesList={favoriteMovies} />
            </Wrap>
          }
        />
        <Route
          path="/profile"
          element={
            <Wrap footer={false}>
              <Profile user={user} handleUpdateUser={handleUpdateUser} />
            </Wrap>
          }
        />
        <Route
          path="/sign-in"
          element={<Login onLogin={onLogin} success={infoToolTip.success} />}
        />
        <Route
          path="/sign-up"
          element={<Register onRegister={onRegister} success={infoToolTip.success} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <InfoToolTip onClose={onClosePopup} infoToolTip={infoToolTip} />
    </div>
  );
}

export default App;
