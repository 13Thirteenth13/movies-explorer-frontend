export const moviesApiAddress = "https://api.nomoreparties.co";
export const backendApiAddress = /* "https://api.movies-exp.thirteenth.nomoredomains.club"; */
  "http://localhost:5000";


export const regForSymbols = /[_~!@#$%^&*()\[\]+`'";:<>\/\\|=]/g;
export const regForName = /[a-z-. а-яё]+/g;
export const regForPassword = /[0-9a-z-а-яё]+/g;

export const validationMessages = {
  name: "Имя содержит недопустимые символы. Имя может состоять из латиницы, кириллицы, дефиса, пробела.",
  email: "Введите корректный формат почты",
  password:
    "Пароль содержит не допустимые символы. Пароль может состоять из цифр, латиницы, кириллицы, дефиса.",
};

export const resMessages = {
  409: "Пользователь с данным email уже зарегистрирован",
  401: "Не авторизован / не зарегистрирован",
  500: "Ошибка на сервере",
  400: "Введенные данные невалидны проверьте адрес или введите корректные данные",
};

export const infoMessages = {
  notFound: "Ничего не найдено",
  requestMoviesFailed: "Ошибка: отсутствует соединение с интернетом или сервер недоступен",
};
