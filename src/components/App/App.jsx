import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Wrap from "../Wrap/Wrap.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import InfoToolTip from "../InfoToolTip/InfoToolTip.jsx";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { useStore } from "../../services/StoreProvider.js";
import { getUser } from "../../services/actions/user.js";
import { CLOSE_TOOL_TIP } from "../../services/actions/toolTip.js";
import { getSavedMovies } from "../../services/actions/savedMovies";

const App = () => {
  const [state, dispatch] = useStore();
  const { loggedIn } = state;

  useEffect(() => {
    getUser(dispatch);
    if (loggedIn) {
      getSavedMovies(dispatch);
    }
    if (state.toolTip.isOpen) {
      setTimeout(() => {
        dispatch({ type: CLOSE_TOOL_TIP });
      }, 5000);
    }
  }, [dispatch, loggedIn, state.toolTip.isOpen]);

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
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute>
              <SavedMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <InfoToolTip />
    </div>
  );
}

export default App;
