import { backendApiAddress } from "../constants.js";

class MainApi {
  constructor(address) {
    this._address = address;
  }

  _handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }

  updateUser({ name, email }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({ name, email }),
    }).then(this._handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(this._handleResponse);
  }

  saveMovie(body) {
    return fetch(`${this._address}/movies`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify(body),
    }).then(this._handleResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._address}/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    }).then(this._handleResponse);
  }
};

const mainApi = new MainApi(backendApiAddress);

export default mainApi;
