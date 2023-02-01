import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import Preloader from "../Preloader/Preloader.jsx"

const MoviesCardList = ({ moviesList, loading }) => {
  const [countMovies, setCountMovies] = useState(12);

  const handleClickMoreMovies = () => {
    setCountMovies(countMovies + 12);
  }

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
