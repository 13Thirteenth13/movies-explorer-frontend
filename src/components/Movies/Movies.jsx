import { useState } from 'react';

import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { mainApi } from "../../utils/MainApi.js"
import { moviesApi } from "../../utils/MoviesApi";

const counterMoreCards = () => {
  const counterCards = {
    start: 12,
    load: 3
  };
  if (window.innerWidth < 1001) {
    counterCards.start = 8;
    counterCards.load = 2;
  }
  if (window.innerWidth < 706) {
    counterCards.start = 5;
    counterCards.load = 1;
  }
  return counterCards;
}

const Movies = () => {
  const counterCards = counterMoreCards();
  const [renderCounter, setRenderCounter] = useState(counterCards.start);

  const changeCounter = () => {
    const counterCards = counterMoreCards();
    setRenderCounter(renderCounter + counterCards.load);
  }

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
        Promise.all([moviesApi.getMoviesCards(), mainApi.getMoviesCard()])
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
          setCards((beatFilmCards) => {
            const newMergeCards = beatFilmCards.map(
              beatFilmCard => {
              if (beatFilmCard._id === card._id) {
                beatFilmCard.saved = false;
              }
              return beatFilmCard;
            })
            localStorage.setItem('local-movies', JSON.stringify(newMergeCards));
            return newMergeCards;
          })
          localStorage.removeItem('saved-movies');
        })
    } else {
      const renderSavedCard = {
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
      mainApi.addCard(renderSavedCard)
        .then((serverCard) => {
          moviesApi.addCard(serverCard)
          setCards((beatFilmCards) => {
            localStorage.removeItem('saved-movies');
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
              localStorage.setItem('local-movies', JSON.stringify(newMergeCards));
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
}

export default Movies;
