import { useState } from 'react';

import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { mainApi } from "../../utils/MainApi.js"
import { moviesApi } from "../../utils/MoviesApi";
import { counterMoreCards } from '../../utils/constants.js';

const Movies = () => {
  const counterCards = counterMoreCards();
  const [renderCounter, setRenderCounter] = useState(counterCards.start);

  const changeCounter = () => {
    const counterCards = counterMoreCards();
    setRenderCounter(renderCounter + counterCards.load);
  };

  const [cards, setCards] = useState([]);
  const [cardsFiltered, setCardsFiltetred] = useState([]);
  const [searchMovies, setSearchMovies] = useState(false);

  const [preloader, setPreloader] = useState(false);

  const filterCards = (search) => {
    setSearchMovies(true);
    const filter = (cards) => {
      setCardsFiltetred(cards.filter((card) => {
        const nameMovie = card.nameRU.toLowerCase().includes(search.name.toLowerCase());
        const durationMovieShort = search.durationMovieShort ? card.duration <= 40 : true;
        return nameMovie && durationMovieShort;
      }))
    }

    if (cards.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('local-movies') || '[]');

      if (localMovies.length === 0) {
        const token = localStorage.getItem('jwt');
        mainApi.setToken(token);
        setPreloader(true);
        Promise.all([moviesApi.getCards(), mainApi.getCards()])
          .then(([beatFilmCards, localCards]) => {
            const mergeCards = beatFilmCards.map(card => {
              const localCard = localCards.find((localCard) => localCard.movieId === card.id);
              card._id = localCard !== undefined ? localCard._id : '';
              card.movieId = card.id;
              card.thumbnail = `https://api.nomoreparties.co/${card.image.url}`;
              card.saved = localCard !== undefined;
              return card;
            })
            setCards(mergeCards);
            filter(mergeCards);
            localStorage.setItem('local-movies', JSON.stringify(mergeCards));
            setPreloader(false);
          })
      } else {
        setCards(localMovies);
        filter(localMovies);
      }
    } else {
      filter(cards);
      setRenderCounter(counterCards.start);
    }
  };

  const saveMovie = (card) => {
    if (card.saved) {
      mainApi.deleteCard(card._id)
        .then(() => {
          moviesApi.deleteCard(card.id);
          setCards((beatFilmCards) => {
            const newMergeCards = beatFilmCards.map(
              beatFilmCard => {
                if (beatFilmCard._id === card._id) {
                  beatFilmCard.saved = false;
                }
                return beatFilmCard;
              })
            return newMergeCards;
          })
        })
    } else {
      const makeSavedCard = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co/${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${card.image.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      };

      mainApi.addCard(makeSavedCard)
        .then((serverCard) => {
          moviesApi.addCard(serverCard)
          setCards((beatFilmCards) => {
            const newMergeCards = beatFilmCards.map(
              beatFilmCard => {
                if (beatFilmCard.id === serverCard.movieId) {
                  beatFilmCard.saved = true;
                  beatFilmCard._id = serverCard._id;
                  beatFilmCard.movieId = serverCard.movieId;
                  beatFilmCard.thumbnail = serverCard.thumbnail;
                }
                return beatFilmCard;
              })
            return newMergeCards;
          })
        })
    }
  };

  return (
    <main className="movies">
      <SearchForm
        filterCards={filterCards}
        page='movies'
      />
      <MoviesCardList
        cards={cardsFiltered.filter((_, i) => i < renderCounter)}
        preloader={preloader}
        searchMovies={searchMovies}
        saveMovie={saveMovie}
      />
      {(cardsFiltered.length > renderCounter) && <button className="cards__button" onClick={changeCounter}>
        Ещё
      </button>}
    </main>
  );
};

export default Movies;
