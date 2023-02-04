export const moviesApiAddress = "https://api.nomoreparties.co";
export const backendApiAddress = /* "https://api.movies-exp.thirteenth.nomoredomains.club"; */
"http://localhost:5000";


export const regForSymbols = /[_~!@#$%^&*()\[\]+`'";:<>\/\\|=]/g;
export const regForName = /[a-z-. а-яё]+/g;
export const regForPassword = /[0-9a-z-а-яё]+/g;

export const validationMessages = {
  name: "Имя содержит недопустимые символы. Текст может состоять из латиницы, кирилицы, дефиса и/или пробела.",
  email: "Введите корректный формат почты",
  password:
    "Пароль содержит не допустимые символы. Текст может состоять из цифр, латиницы, кирилицы, дефиса.",
};
