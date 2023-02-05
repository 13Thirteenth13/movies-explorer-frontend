import { useCallback } from "react";

import {
  MOVIES_CHANGE_FILTER,
  searchMovies,
  MOVIES_SEARCH_TEXT,
  ADD_SHOWED_MOVIES,
  MOVIES_NOT_FOUND,
} from "../../services/actions/mainMovies.js";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { useStore } from "../../services/StoreProvider.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

const Movies = () => {
  const [state, dispatch] = useStore();
  const { searchText, filterShortFilms } = state.mainMovie;

  const onChangeFilter = (e) => {
    dispatch({ type: MOVIES_CHANGE_FILTER, checked: e.target.checked });
  };

  const handleChange = (e) => {
    dispatch({ type: MOVIES_SEARCH_TEXT, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(dispatch);
  };

  const isNotFound = useCallback(() => {
    dispatch({ type: MOVIES_NOT_FOUND });
  }, [dispatch]);

  const handleClickMoreMovies = useCallback(
    (count) => {
      dispatch({ type: ADD_SHOWED_MOVIES, count });
    },
    [dispatch]
  );

  return (
    <main className="movies">
      <SearchForm
        searchText={searchText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      >
        <FilterCheckbox
          filterShortFilms={filterShortFilms}
          onChangeFilter={onChangeFilter}
        />
      </SearchForm>
      <MoviesCardList
        {...state.mainMovie}
        handleClickMoreMovies={handleClickMoreMovies}
        isNotFound={isNotFound}
      />
    </main>
  );
}

export default Movies;
