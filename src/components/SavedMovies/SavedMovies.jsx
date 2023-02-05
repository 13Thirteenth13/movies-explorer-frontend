import { useCallback, useEffect } from "react";

import {
  SAVED_MOVIES_CHANGE_FILTER,
  SAVED_MOVIES_SEARCH_TEXT,
  ADD_SHOWED_SAVED_MOVIES,
  SAVED_MOVIES_NOT_FOUND,
  RESET_STATE_SAVED_MOVIES,
  SEARCH_SAVED_MOVIES,
} from "../../services/actions/savedMovies.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { useStore } from "../../services/StoreProvider.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

const SavedMovies = () => {
  const [state, dispatch] = useStore();
  const movieCardListProps = state.savedMovie;

  useEffect(() => {
    dispatch({ type: RESET_STATE_SAVED_MOVIES });
  }, [dispatch]);

  const onChangeFilter = (e) => {
    dispatch({ type: SAVED_MOVIES_CHANGE_FILTER, checked: e.target.checked });
  };

  const handleChange = (e) => {
    dispatch({ type: SAVED_MOVIES_SEARCH_TEXT, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SEARCH_SAVED_MOVIES });
  };

  const isNotFound = useCallback(() => {
    dispatch({ type: SAVED_MOVIES_NOT_FOUND });
  }, [dispatch]);

  const handleClickMoreMovies = useCallback(
    (count) => {
      dispatch({ type: ADD_SHOWED_SAVED_MOVIES, count });
    },
    [dispatch]
  );

  return (
    <main className="movies">
      <SearchForm
        searchText={movieCardListProps.searchText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      >
        <FilterCheckbox
          filterShortFilms={movieCardListProps.filterShortFilms}
          onChangeFilter={onChangeFilter}
        />
      </SearchForm>
      <MoviesCardList
        {...movieCardListProps}
        handleClickMoreMovies={handleClickMoreMovies}
        isNotFound={isNotFound}
      />
    </main>
  );
}

export default SavedMovies;
