import { useState, useEffect } from 'react';

import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { mainApi } from '../../utils/MainApi.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { counterMoreCards } from '../../utils/constants.js';

const SavedMovies = () => {
  const counterCards = counterMoreCards();
  const [renderCounter, setRenderCounter] = useState(counterCards.start);

  const changeCounter = () => {
    const counterCards = counterMoreCards();
    setRenderCounter(renderCounter + counterCards.load);
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
    mainApi.getCards()
      .then((cards) => {
        setCards(cards);
        setCardsFiltetred(cards);
      })
  }, []);

  const saveMovie = (card) => {
    mainApi.deleteCard(card._id).then(() => {
        moviesApi.deleteCard(card.movieId)
        setCardsFiltetred((savedCards) => {
          const filteredSavedCards = savedCards.filter(
            (savedCard) => savedCard._id !== card._id
          );
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
