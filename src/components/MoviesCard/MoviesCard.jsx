import { useLocation } from "react-router-dom";
import { saveMovie, deleteMovie } from "../../services/actions/movie.js";
import { useStore } from "../../services/StoreProvider.js";
import { moviesApiAddress } from "../../utils/constants.js";

const MoviesCard = ({ movie }) => {
  const [state, dispatch] = useStore();
  const { savedMovies } = state.movie;
  const location = useLocation();
  const path = location.pathname;
  const onRouteSavedMovies = path === "/saved-movies";
  const imageUrl = movie.image.formats
    ? moviesApiAddress + movie.image.url
    : movie.image;
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const movieSaved = savedMovies.find(
    (savedMovie) => savedMovie.movieId === movie.id || movie.movieId
  );

  const buttonClassName =
    (movieSaved && !onRouteSavedMovies && "card__favorite_active") ||
    (onRouteSavedMovies && "card__favorite_delete");

  const handleClickFavorite = () => {
    console.log(movieSaved);
    if (movieSaved || onRouteSavedMovies) {
      deleteMovie(dispatch, movieSaved._id);
    } else {
      saveMovie(dispatch, movie);
    }
  };

  return (
    <article className="card">
      <div className="card__header">
        <div>
          <h3 className="card__title">{movie.nameRU}</h3>
          <p className="card__duration">
            {`${hours === 0 ? "" : hours + "ч"} ${minutes}м`}
          </p>
        </div>
        <button
          className={`card__favorite ${buttonClassName}`}
          onClick={handleClickFavorite}
        ></button>
      </div>
      <img
        className="card__image"
        src={imageUrl}
        alt={movie.nameRU}
      />
    </article>
  );
}

export default MoviesCard;
