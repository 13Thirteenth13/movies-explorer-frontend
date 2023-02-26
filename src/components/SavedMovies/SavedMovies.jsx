import { useState, useEffect } from 'react';

import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { mainApi } from '../../utils/MainApi.js';
import { moviesApi } from '../../utils/MoviesApi.js';

const renderCards = () => {
  const render = {
    start: 12,
    load: 3
  };
  if (window.innerWidth < 1001) {
    render.start = 8;
    render.load = 2;
  }
  if (window.innerWidth < 706) {
    render.start = 5;
    render.load = 1;
  }
  return render;
};

const SavedMovies = () => {
  const render = renderCards();
  const [renderCounter, setRenderCounter] = useState(render.start);

  const changeCounter = () => {
    const render = renderCards();
    setRenderCounter(renderCounter + render.load);
  };

  const [cards, setCards] = useState([]);
  const [cardsFiltered, setCardsFiltetred] = useState([]);

  const filterCards = (search) => {
    setCardsFiltetred(cards.filter((card) => {
      const nameMovie = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
      const durationMovieShort = search.durationMovieShort ? card.duration <= 40 : true;
      return nameMovie && durationMovieShort;
    }))
  };

  useEffect(() => {
    mainApi.getMoviesCard()
      .then((serverCards) => {
        setCards(serverCards);
        setCardsFiltetred(serverCards);
      })
  }, []);

  const saveMovie = (card) => {

    mainApi.deleteCard(card._id)
      .then(() => {
        moviesApi.deleteCard(card.movieId)
        setCardsFiltetred((savedCards) => {
          const filteredSavedCards = savedCards.filter(savedCard => savedCard._id !== card._id);
          return filteredSavedCards;
        })
      })
  };

  return (
    <main className="movies">
      <SearchForm
        filterCards={filterCards}
        page='saved-movies'
        required={false}
      />
      <MoviesCardList
        cards={cardsFiltered.filter((_, i) => i < renderCounter)}
        saveMovie={saveMovie}
      />
      {(cardsFiltered.length > renderCounter) && <button className="cards__button" onClick={changeCounter}>
        Ещё
      </button>}
    </main>
  );
};

export default SavedMovies;
