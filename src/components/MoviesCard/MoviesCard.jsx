import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ADD_TO_SAVED_MOVIE,
  DELETE_SAVED_MOVIE,
} from "../../services/actions/movie.js";
import { useStore } from "../../services/StoreProvider";
import { moviesApiAddress } from "../../utils/constants.js";

const MoviesCard = ({ movie }) => {
  const [state, dispatch] = useStore();
  const { savedMovies } = state.movie;
  const location = useLocation();
  const path = location.pathname;
  const onRouteSavedMovies = path === "/saved-movies";
  const imageUrl = movie.image.formats.thumbnail.url;
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const movieSaved = savedMovies.some((item) => item.id === movie.id);

  const buttonClassName =
    (movieSaved && !onRouteSavedMovies && "card__favorite_active") ||
    (onRouteSavedMovies && "card__favorite_delete");

  useEffect(() => { }, []);


  const handleClickFavorite = (e) => {
    if (movieSaved) {
      dispatch({ type: DELETE_SAVED_MOVIE, movie });
    } else {
      dispatch({ type: ADD_TO_SAVED_MOVIE, movie });
    }
  }

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
        src={`${moviesApiAddress}${imageUrl}`}
        alt={movie.nameRU}
      />
    </article>
  );
}

export default MoviesCard;
