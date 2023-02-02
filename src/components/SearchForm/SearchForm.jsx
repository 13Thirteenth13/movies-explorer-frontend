import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { getMovies, SET_SEARCH_TEXT } from "../../services/actions/movie.js";
import { useStore } from "../../services/StoreProvider.js";

const SearchForm = () => {
  const [state, dispatch] = useStore();

  function handleChange(e) {
    dispatch({ type: SET_SEARCH_TEXT, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(dispatch);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__form-input"
          placeholder="Фильм"
          value={state.movie.searchText}
          onChange={handleChange}
          required
        />
        <button className="search__submit" type="submit"></button>
      </form>
      <FilterCheckbox />
    </div >
  );
};

export default SearchForm;
