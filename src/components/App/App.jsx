import { useLocation, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import Footer from "../Footer/Footer.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";

import api from "../../utils/api.js"

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [favoriteMovies, setFavoriteMOvies] = useState([]);

  const location = useLocation();
  const path = location.pathname;
  const onAuth = path === "/sign-in" || path === "/sign-up";

  const [moviesList, setMoviesList] = useState([]);

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
      {!onAuth && <Header isAuth={isAuth} />}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/movies" element={<Movies moviesList={moviesList} loading={loading} />} />
        <Route path="/saved-movies" element={<SavedMovies moviesList={favoriteMovies} />} />
      </Routes>

      {!onAuth && <Footer />}
    </div>
  );
}

export default App;
