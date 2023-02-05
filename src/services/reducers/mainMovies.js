import { infoMessages } from "../../utils/constants.js";
import {
  REQUEST_MOVIES,
  SEARCH_MOVIES,
  REQUEST_MOVIES_FAILED,
  MOVIES_CHANGE_FILTER,
  MOVIES_SEARCH_TEXT,
  ADD_SHOWED_MOVIES,
  MOVIES_NOT_FOUND,
} from "../actions/mainMovies.js";

export const movieReducer = (state, action) => {
  switch (action.type) {
    case MOVIES_NOT_FOUND:
      return {
        ...state,
        mainMovie: {
          ...state.mainMovie,
          notFound: state.mainMovie.filterShortFilms
            ? infoMessages.notFound
            : "",
        },
      };

    case ADD_SHOWED_MOVIES:
      return {
        ...state,
        mainMovie: {
          ...state.mainMovie,
          showedMovies: state.mainMovie.showedMovies + action.count,
        },
      };

    case MOVIES_CHANGE_FILTER:
      return {
        ...state,
        mainMovie: {
          ...state.mainMovie,
          filterShortFilms: action.checked,
          notFound:
            !action.checked && state.mainMovie.movies.length
              ? ""
              : state.mainMovie.notFound,
        },
      };

    case REQUEST_MOVIES:
      return {
        ...state,
        loading: true,
        mainMovie: {
          ...state.mainMovie,
          notFound: "",
        },
      };

    case SEARCH_MOVIES:
      const moviesList = action.movies.filter((movie) =>
        `${movie.nameRU} ${movie.nameEN}`.includes(state.mainMovie.searchText)
      );
      return {
        ...state,
        loading: false,
        mainMovie: {
          ...state.mainMovie,
          movies: moviesList,
          notFound: !moviesList.length ? infoMessages.notFound : "",
        },
      };

    case REQUEST_MOVIES_FAILED:
      return {
        ...state,
        loading: false,
        toolTip: {
          isOpen: true,
          success: false,
          message: infoMessages.requestMoviesFailed,
        },
      };

    case MOVIES_SEARCH_TEXT:
      return {
        ...state,
        mainMovie: { ...state.mainMovie, searchText: action.text },
      };

    default:
      return state;
  }
};
