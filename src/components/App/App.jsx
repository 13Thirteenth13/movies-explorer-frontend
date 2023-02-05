import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";

import Wrap from "../Wrap/Wrap.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import InfoToolTip from "../Modal/InfoToolTip.jsx";
import Modal from "../Modal/Modal.jsx";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { useStore } from "../../services/StoreProvider.js";
import { getUser } from "../../services/actions/user.js";
import { CLOSE_TOOL_TIP } from "../../services/actions/toolTip.js";
import { getSavedMovies } from "../../services/actions/savedMovies.js";
import { SET_STATE_MAIN_MOVIES } from "../../services/actions/mainMovies.js";

const App = () => {
  const [state, dispatch] = useStore();
  const { loggedIn } = state;
  const location = useLocation();
  const navigate = useNavigate();

  const checkDataInStorage = () => {
    const moviesLocalState = JSON.parse(localStorage.getItem("moviesLocalState"));
    if (moviesLocalState) {
      dispatch({ type: SET_STATE_MAIN_MOVIES, mainMovie: moviesLocalState });
    }
  };

  useLayoutEffect(() => {
    getUser(dispatch).then((success) => {
      if (success) {
        navigate(location.pathname);
      }
    });
    if (loggedIn) {
      checkDataInStorage();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies(dispatch);
    }
  }, [dispatch, loggedIn]);

  useEffect(() => {
    if (state.toolTip.isOpen) {
      setTimeout(() => {
        dispatch({ type: CLOSE_TOOL_TIP });
      }, 5000);
    }
  }, [dispatch, state.toolTip.isOpen]);

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
            <ProtectedRoute path="/movies">
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute path="/saved-movies">
              <SavedMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {state.toolTip.isOpen && (
        <Modal>
          <InfoToolTip />
        </Modal>
      )}
    </div>
  );
}

export default App;
