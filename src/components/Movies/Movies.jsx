import { useState } from 'react';

import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { mainApi } from "../../utils/MainApi.js"
import { moviesApi } from "../../utils/MoviesApi";

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
}

const Movies = () => {
  const render = renderCards();
  const [renderCounter, setRenderCounter] = useState(render.start);

  const changeCounter = () => {
    const render = renderCards();
    setRenderCounter(renderCounter + render.load);
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
      setRenderCounter(render.start);
    }
  };

  const saveMovie = (card) => {
    if (card.saved) {
      mainApi.deleteCard(card._id)
        .then(() => {
          setCards((beatFilmCards) => {
            const updateMergeCards = beatFilmCards.map(beatCard => {
              if (beatCard._id === card._id) {
                beatCard.saved = false;
              }
              return beatCard;
            })
            return updateMergeCards;
          })
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
            const updatedMergedCards = beatFilmCards.map(beatCard => {
              if (beatCard.id === serverCard.movieId) {
                beatCard.saved = true;
                beatCard._id = serverCard._id;
                beatCard.movieId = serverCard.movieId;
                beatCard.thumbnail = serverCard.thumbnail;
              }
              return beatCard;
            })
            return updatedMergedCards;
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
