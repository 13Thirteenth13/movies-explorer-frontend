import { useState, useContext, useEffect } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

const Profile = (props) => {
  const { onProfile, logOut } = props;
  const currentUser = useContext(CurrentUserContext);

  const [value, setValue] = useState({ name: currentUser.name, email: currentUser.email });
  const [error, setError] = useState({ name: "", email: "" });
  const [isValidForm, setIsValidForm] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const hasError = apiError || error.email || error.name;

  const handleChange = (e) => {
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value
    }));
    setError((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.validationMessage
    }));
    setIsValidForm(e.target.closest('form').checkValidity());
    setIsSubmit(false);
  }

  useEffect(() => {
    setIsDisabled(currentUser.name === value.name && currentUser.email === value.email)
  }, [value.name, value.email, currentUser.name, currentUser.email]);

  useEffect(() => {
    setValue({ name: currentUser.name, email: currentUser.email })
  }, [currentUser.name, currentUser.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfile(value, setApiError);
    setIsSubmit(true);
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form
        action="submit"
        className="profile__form"
        onSubmit={handleSubmit}>
        <label className="profile__label profile__underline">
          <input
            name="name"
            type="text"
            className={
              `profile__input
              ${error.name && "profile__input_color_error"}`
            }
            onChange={handleChange}
            value={value.name}
            minLength={2}
            required
          />
        </label>

        <label className="profile__label">
          <input
            name="email"
            type="text"
            className={
              `profile__input
              ${error.email && "profile__input_color_error"}`
            }
            onChange={handleChange}
            value={value.email}
            pattern=".+@.+\..+"
            required
          />
        </label>
        <span
          className={
            hasError ?
              "profile__error" :
              "profile__success"
          }
        >
          {!isSubmit && !hasError ? '' : hasError || 'Данные обновлены'}
        </span>
        <button
          type="submit"
          className="profile__submit"
          disabled={!isValidForm || isDisabled}
        >
          Редактировать
        </button>
      </form>
      <button
        type="button"
        className="profile__logout"
        onClick={logOut}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
