import { mainApiAddress } from "./constants";

class MainApi {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  };

  //ошибка
  _parseResponse(res) {
    return res.json()
      .then((data) => {
        if (res.ok) {
          return data;
        }
        return Promise.reject(new Error(data.message))
      })
  };

  _buildHeaders() {
    const headers = {
      ...this._headers, authorization: localStorage.getItem('jwt') || ''
    };
    return headers;
  };

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._parseResponse(res));
  };

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(res => this._parseResponse(res));
  };

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._buildHeaders()
    }).then(res => this._parseResponse(res));
  };

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._buildHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    }).then(res => this._parseResponse(res));
  };
};

export const mainApi = new MainApi(mainApiAddress);
