import { backendApiAddress } from "../constants.js";

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
      `Ошибка ${response.status}: ${response.statusText}`
    );
};

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ name, email, password }) => {
  return fetch(`${backendApiAddress}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const login = ({ email, password }) => {
  return fetch(`${backendApiAddress}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (token) => {
  return fetch(`${backendApiAddress}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
  }).then((res) => checkResponse(res));
}
