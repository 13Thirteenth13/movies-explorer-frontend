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

import api from "../../utils/Api.js"

const App = () => {
  const isAuth = true;
  const [loading, setLoading] = useState(false);
  const [favoriteMovies, setFavoriteMOvies] = useState([]);

  const [moviesList, setMoviesList] = useState([]);

  const Wrap = ({ children, header = true, footer = true }) => {
    return (
      <>
        {header && <Header isAuth={isAuth} />}
        {children}
        {footer && <Footer />}
      </>
    );
  };

  useEffect(() => {
    setLoading(true);
    api
      .getMovies()
      .then((movies) => {
        setMoviesList(movies);
        setFavoriteMOvies(movies.slice(0, 3));
        setTimeout(() => setLoading(false), 2000);
      })
      .catch(console.log);
  }, []);

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
              <Profile />
            </Wrap>
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
