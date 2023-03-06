export const moviesApiAddress = {
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "content-type": "application/json",
    "authorization": "",
  }
};

export const mainApiAddress = {
  url: "https://api.movies-exp.thirteenth.nomoredomains.club",
  headers: {
    "content-type": "application/json",
    "authorization": "",
  }
};


export const counterMoreCards = () => {
  const counterCards = {
    start: 12,
    load: 3
  };
  if (window.innerWidth < 1090) {
    counterCards.start = 8;
    counterCards.load = 2;
  }
  if (window.innerWidth < 685) {
    counterCards.start = 5;
    counterCards.load = 1;
  }
  return counterCards;
};
