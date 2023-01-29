import { authApiAddress } from "./constants";

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ name, email, password }) => {
  return fetch(`${authApiAddress}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const login = ({ email, password }) => {
  return fetch(`${authApiAddress}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = () => {
  return fetch(`${authApiAddress}/users/me`, {
    method: "GET",
    headers,
  }).then((res) => checkResponse(res));
}

export const logout = () => {
  return fetch(`${authApiAddress}/logout`, {
    method: "GET",
    headers,
  }).then((res) => checkResponse(res));
}
