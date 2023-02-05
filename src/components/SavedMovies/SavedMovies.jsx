import { useCallback } from "react";

import {
  getSavedMovies,
  SAVED_MOVIES_CHANGE_FILTER,
  SAVED_MOVIES_SEARCH_TEXT,
  ADD_SHOWED_SAVED_MOVIES,
} from "../../services/actions/savedMovies.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { useStore } from "../../services/StoreProvider.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

const SavedMovies = () => {
  const [state, dispatch] = useStore();
  const { searchText, filterShortFilms } = state.savedMovie;

  const onChangeFilter = (e) => {
    dispatch({ type: SAVED_MOVIES_CHANGE_FILTER, checked: e.target.checked });
  };

  const handleChange = (e) => {
    dispatch({ type: SAVED_MOVIES_SEARCH_TEXT, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSavedMovies(dispatch);
  };

  const handleClickMoreMovies = useCallback(
    (count) => {
      dispatch({ type: ADD_SHOWED_SAVED_MOVIES, count });
    },
    [dispatch]
  );

  return (
    <main className="movies">
      <SearchForm
        searchText={searchText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}>
        <FilterCheckbox
          filterShortFilms={filterShortFilms}
          onChangeFilter={onChangeFilter} />
      </SearchForm>
      <MoviesCardList
        {...state.savedMovie}
        handleClickMoreMovies={handleClickMoreMovies}
      />
    </main>
  );
}

export default SavedMovies;
