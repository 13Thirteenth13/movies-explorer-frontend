import { moviesApiAddress } from "./constants.js";

class MoviesApi {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
    this._movies = JSON.parse(localStorage.getItem('local-movies') || '[]');
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

  getMoviesCards() {
    if (this._movies.length === 0) {
      return fetch(`${this._url}`, {
        headers: this._headers
      }).then(res => this._parseResponse(res))
        .then((movies) => {
          this._movies = movies;
          localStorage.setItem('local-movies', JSON.stringify(movies));
          return movies;
        });
    }
  };

  deleteCard(cardId) {
    this._movies = this._movies.map((movie) => {
      if (movie.id === cardId) {
        movie.saved = false
      }
      return movie;
    });
    localStorage.setItem('local-movies', JSON.stringify(this._movies));
    return this._movies;
  };

  addCard(card) {
    const localCard = this._movies.find((localCard) => localCard.id === card.movieId);
    if (localCard) {
      localCard._id = card._id;
      localCard.movieId = localCard.id;
      localCard.thumbnail = `https://api.nomoreparties.co/${localCard.image.url}`;
      localCard.saved = true;
      localStorage.setItem('local-movies', JSON.stringify(this._movies));
      return this._movies;
    }
  };

  //сброс карточек
  reset() {
    this._movies = []
  }
};

export const moviesApi = new MoviesApi(moviesApiAddress);
