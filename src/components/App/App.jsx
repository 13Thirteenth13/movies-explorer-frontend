import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import Footer from "../Footer/Footer.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext, defaultUser } from '../../contexts/CurrentUserContext.js';
import { mainApi } from "../../utils/MainApi.js";
import { moviesApi } from "../../utils/MoviesApi.js";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isAuth, setIsAuth] = useState(false);

  const Wrap = ({ children, header = true, footer = true }) => {
    return (
      <>
        {header && <Header loggedIn={loggedIn} />}
        {children}
        {footer && <Footer />}
      </>
    );
  };

  const checkToken = () => {
    const token = localStorage.getItem('jwt') || '';
    mainApi.setToken(token);
    if (token) {
      mainApi.getUserInfo()
        .then((user) => {
          if (user) {
            setLoggedIn(true);
            setCurrentUser(user);
            setIsAuth(true);
          } else {
            logOut();
          }
        })
        .catch((err) => {
          logOut();
        });
    } else {
      logOut();
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const registerUser = (data, callback) => {
    mainApi.register(data)
      .then((result) => {
        setCurrentUser(result);
        return mainApi.login({ email: data.email, password: data.password })
      })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        callback('');
        navigate('/movies');
      })
      .catch((err) => {
        callback(err.message)
      })
  };

  const loginUser = (data, callback) => {
    mainApi.login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        callback('');
        navigate('/movies');
      })
      .catch((err) => {
        callback(err.message)
      })
  };

  const updateUser = (data, callback) => {
    const token = localStorage.getItem('jwt') || '';
    mainApi.setToken(token);
    mainApi.editUserInfo(data)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer });
        callback('');
      })
      .catch((err) => {
        callback(err.message)
      })
  };

  const logOut = () => {
    setIsAuth(false);
    setLoggedIn(false);
    setCurrentUser(defaultUser);
    localStorage.clear();
    mainApi.setToken('');
    mainApi.reset();
    moviesApi.reset();
    navigate('/');
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
            component={Movies}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Wrap>
                  <Movies
                    component={Main}
                  />
                </Wrap>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            component={SavedMovies}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Wrap>
                  <SavedMovies />
                </Wrap>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            component={Profile}
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Wrap footer={false}>
                  <Profile
                    onProfile={updateUser}
                    logOut={logOut}
                  />
                </Wrap>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            component={Login}
            element={
              !isAuth ? <Login onLogin={loginUser} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/sign-up"
            component={Register}
            element={
              !isAuth ? <Register onRegister={registerUser} /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
