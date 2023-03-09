const FilterCheckbox = (props) => {
  const { switchCheckbox, valueCheckbox } = props;
  return (
    <div className="filter">
      <label className="filter__label">
        <input
        type="checkbox"
        className="filter__input"
        onChange={switchCheckbox}
        name='durationMovieShort'
        checked={valueCheckbox}
        />
        <span className="filter__switch"></span>
        <span className="filter__switch-text">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
