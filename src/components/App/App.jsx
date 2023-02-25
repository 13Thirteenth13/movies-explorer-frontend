import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import Footer from "../Footer/Footer.jsx";
import { Login, Register } from "../Auth";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

import { CurrentUserContext, defaultUser } from '../../contexts/CurrentUserContext.js';
import { mainApi } from "../../utils/MainApi.js";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const [loading, setLoading] = useState(false);
  const [favoriteMovies, setFavoriteMOvies] = useState([]);

  const [moviesList, setMoviesList] = useState([]);

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

  //обновление checkToken
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
    setLoggedIn(false);
    setCurrentUser(defaultUser);
    localStorage.clear();
    mainApi.setToken('');
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
                <Profile
                  onProfile={updateUser}
                  logOut={logOut}
                />
              </Wrap>
            }
          />
          <Route path="/sign-in" element={<Login onLogin={loginUser} />} />
          <Route path="/sign-up" element={<Register onRegister={registerUser} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
