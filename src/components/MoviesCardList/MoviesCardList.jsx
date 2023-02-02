import { useState } from "react";
import { useStore } from "../../services/StoreProvider.js";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import Preloader from "../Preloader/Preloader.jsx"

const MoviesCardList = ({ moviesList, loading }) => {
  const [state] = useStore();
  const { filterShortFilms } = state.movie;
  const [countMovies, setCountMovies] = useState(12);

  if (filterShortFilms) {
    moviesList = moviesList.filter((movie) => movie.duration < 60);
  };

  const handleClickMoreMovies = () => {
    setCountMovies(countMovies + 12);
  };

  return (
    <div className="cards">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className="cards__list">
            {moviesList.slice(0, countMovies).map((movie) => (
              <MoviesCard movie={movie} key={movie.id} />
            ))}
          </div>

          {countMovies < moviesList.length && (
            <button
              className="cards__button"
              onClick={handleClickMoreMovies}
            >
              Ещё
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
