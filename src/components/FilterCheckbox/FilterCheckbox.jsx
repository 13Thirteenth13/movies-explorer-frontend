import { filterCheckboxPT } from "../../utils/propTypes.js";

const FilterCheckbox = ({ onChangeFilter, filterShortFilms }) => {
  return (
    <div className="filter">
      <label className="filter__label">
        <input
          type="checkbox"
          className="filter__input"
          onChange={onChangeFilter}
          checked={filterShortFilms}
        />
        <span className="filter__switch"></span>
      </label>
    </div>
  );
};

FilterCheckbox.propTypes = filterCheckboxPT;

export default FilterCheckbox;
