import { useStore } from "../../services/StoreProvider.js";

const FilterCheckbox = () => {
  const [state, dispatch] = useStore();

  const handleChange = (e) => {
    dispatch({ type: "CHANGE_FILTER", checked: e.target.checked });
  }

  return (
    <div className="filter">
      <label className="filter__label">
        <input
          type="checkbox"
          className="filter__input"
          onChange={handleChange}
          checked={state.movie.filterShortFilms}
        />
        <span className="filter__switch"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
