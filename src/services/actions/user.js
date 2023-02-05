import mainApi from "../../utils/api/mainApi.js";
import * as auth from "../../utils/api/auth.js";
import { resMessages } from "../../utils/constants.js";

export const AUTH_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT = "LOGOUT";

export const updateUser = (dispatch, body) => {
  return mainApi
    .updateUser(body)
    .then((data) => {
      dispatch({ type: UPDATE_USER, user: data });
      return { success: true };
    })
    .catch((statusCode) => {
      return { success: false, statusCode };
    });
};

export const onLogin = (dispatch, body) => {
  return auth
    .login(body)
    .then(({ token }) => {
      console.log(token);
      localStorage.setItem("jwt", token);
      dispatch({ type: LOGIN_USER });
      return true;
    })
    .catch((statusCode) => {
      dispatch({ type: LOGIN_USER_FAILED, message: resMessages[statusCode] });
      setTimeout(() => {
        dispatch({ type: LOGIN_USER_FAILED, message: "" });
      }, 10000);
      return false;
    });
};

export const logOut = (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
};

export const onRegister = (dispatch, { name, email, password }) => {
  console.log(name, email, password);
  return auth
    .register({ name, email, password })
    .then(() => {
      dispatch({ type: REGISTER_USER });
      setTimeout(() => {
        onLogin(dispatch, { email, password });
      }, 1000);
      return true;
    })
    .catch((statusCode) => {
      dispatch({ type: LOGIN_USER_FAILED, message: resMessages[statusCode] });
      setTimeout(() => {
        dispatch({ type: LOGIN_USER_FAILED, message: "" });
      }, 10000);
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
    .catch(() => console.log("Пользователь не авторизован"));
};
