const SearchForm = ({
  searchText,
  handleChange,
  handleSubmit,
  children
}) => {
  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__form-input"
          placeholder="Фильм"
          value={searchText}
          onChange={handleChange}
          required
        />
        <button className="search__submit" type="submit"></button>
      </form>
      {children}
    </div >
  );
};

export default SearchForm;
