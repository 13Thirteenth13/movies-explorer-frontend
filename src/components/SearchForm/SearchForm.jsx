import { useEffect, useState, useRef } from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

const SearchForm = (props) => {
  const { filterCards, page, required = true } = props;

  const [error, setError] = useState({ name: '', durationMovieShort: '' });
  const [value, setValue] = useState({ name: '', durationMovieShort: false });
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('search-movies'));
    if (searchMovies) {
      setValue(searchMovies);
      filterCards(searchMovies);
    }
    if (page === 'saved-movies') {
      filterCards(value);
      setValue({ name: '', durationMovieShort: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value: inputValue, validationMessage } = e.target;
    const updatedErrMessage = validationMessage === "Заполните это поле." ? "Нужно ввести ключевое слово" : validationMessage;
    const updatedValue = { ...value, [name]: inputValue }
    if (page === 'movies') {
      localStorage.setItem('search-movies', JSON.stringify(updatedValue));
    }
    setValue(updatedValue);
    setError((state) => ({ ...state, [name]: updatedErrMessage }));
    setIsDisabledButton(!formRef.current.checkValidity());
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    const updatedValue = { ...value, [name]: checked };
    if (page === 'movies') {
      localStorage.setItem('search-movies', JSON.stringify(updatedValue));
    }
    setValue(updatedValue);
    filterCards(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.name === '') {
      error.name = "Нужно ввести ключевое слово";
      setIsDisabledButton(!formRef.current.checkValidity());
    } else {
      filterCards(value);
    };
  };

  return (
    <div className="search">
      <form
        className="search__form"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <input
          type="text"
          className="search__form-input"
          placeholder="Фильм"
          required={required}
          onChange={handleChange}
          value={value.name}
          name="name"
        />
        <span className="search__form__error">{error.name}</span>
        <button
          className="search__submit"
          onClick={handleSubmit}
          disabled={isDisabledButton}
        >
        </button>
      </form>
      <FilterCheckbox
        switchCheckbox={handleCheckbox}
        valueCheckbox={value.durationMovieShort}
      />
    </div >
  );
}

export default SearchForm;
