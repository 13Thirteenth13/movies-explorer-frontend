import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Wrap from "../Wrap/Wrap.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import InfoToolTip from "../InfoToolTip/InfoToolTip.jsx";

import * as auth from "../../utils/auth.js";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { useStore } from "../../services/StoreProvider.js";
import { getMovies } from "../../services/actions/movie.js";
import { CLOSE_TOOL_TIP } from "../../services/actions/toolTip.js";
import { getUser } from "../../services/actions/user.js";

const App = () => {
  const [state, dispatch] = useStore();
  const { loading, loggedIn } = state;
  const { moviesList, savedMovies } = state.movie;
  const infoToolTip = state.toolTip;


  useEffect(() => {
    getMovies(dispatch);
    getUser(dispatch);
  }, [dispatch]);

  const onClosePopup = () => {
    dispatch({ type: CLOSE_TOOL_TIP });
  };

  const MoviesProps = {
    moviesList,
    loading,
  };

  return (
    <div className="page">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Wrap loggedIn={loggedIn}>
              <Main />
            </Wrap>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies {...MoviesProps} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies moviesList={savedMovies} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-in"
          element={<Login success={infoToolTip.success} />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register success={infoToolTip.success} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <InfoToolTip onClose={onClosePopup} infoToolTip={infoToolTip} />
    </div>
  );
}

export default App;
