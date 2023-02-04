import mainApi from "../../utils/api/mainApi.js";
import * as auth from "../../utils/api/auth.js";
import { resMessages } from "../../utils/constants";
import { CLOSE_TOOL_TIP } from "./toolTip";

export const AUTH_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT = "LOGOUT";

export const updateUser = (dispatch, body) => {
  mainApi
    .updateUser(body)
    .then((data) => {
      dispatch({ type: UPDATE_USER, user: data });
    })
    .catch((err) => { console.log(err) });
};

export const onLogin = (dispatch, body) => {
  return auth
    .login(body)
    .then(({ token }) => {
      console.log(token);
      localStorage.setItem("jwt", token);
      dispatch({ type: LOGIN_USER });
      setTimeout(() => {
        dispatch({ type: CLOSE_TOOL_TIP });
      }, 5000);
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
  localStorage.clear().then(() => {
    dispatch({ type: LOGOUT });
  })
    .catch(console.log);
};

export const onRegister = (dispatch, { name, email, password }) => {
  console.log(name, email, password);
  return auth
    .register({ name, email, password })
    .then(() => {
      dispatch({ type: REGISTER_USER });
      onLogin(dispatch, { name, password });
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
