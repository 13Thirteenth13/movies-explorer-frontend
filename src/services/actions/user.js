import mainApi from "../../utils/api/mainApi.js";
import * as auth from "../../utils/api/auth.js";

export const AUTH_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT = "LOGOUT";

export const updateUser = (dispatch, body) => {
  mainApi
    .updateUser(body)
    .then((data) => {
      dispatch({ type: UPDATE_USER, user: data });
      // setInfoTooltip({
      //   message: `Вы успешно изменили свои данные!`,
      //   isOpen: true,
      //   success: true,
      // });
    })
    .catch((err) => {
      // setInfoTooltip({
      //   message: `Ошибка редактирования пользователя! ${err}`,
      //   isOpen: true,
      //   success: false,
      // });
    });
};

export const onLogin = (dispatch, body, state) => {
  return auth
    .login(body)
    .then(({ token }) => {
      console.log(token);
      localStorage.setItem("jwt", token);
      dispatch({ type: LOGIN_USER, auth: true });
      return true;
      // setInfoTooltip({
      //   message: `Вы успешно изменили свои данные!`,
      //   isOpen: true,
      //   success: true,
      // });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER, user: state.user, auth: false });
      // setInfoTooltip({
      //   message: `Ошибка редактирования пользователя! ${err}`,
      //   isOpen: true,
      //   success: false,
      // });
      return false;
    });
};

export const logOut = (dispatch) => {
  return localStorage.clear()
  .then(() => {
    dispatch({ type: LOGOUT });
  });
};

export const onRegister = (dispatch, body) => {
  return auth
    .register(body)
    .then((data) => {
      console.log(data);
      // setInfoTooltip({
      //   message: `Вы успешно изменили свои данные!`,
      //   isOpen: true,
      //   success: true,
      // });
      return true;
    })
    .catch((err) => {
      console.log(err);
      // setInfoTooltip({
      //   message: `Ошибка редактирования пользователя! ${err}`,
      //   isOpen: true,
      //   success: false,
      // });
    });
};

export const getUser = (dispatch) => {
  const token = localStorage.getItem("jwt");
  auth
    .authorize(token)
    .then((user) => {
      console.log(user);
      dispatch({ type: AUTH_USER, user });
    })
    .catch(console.log);
};
