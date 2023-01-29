import { Link } from "react-router-dom";

const Profile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Username!</h1>
      <form action="submit" className="profile__form">
        <label className="profile__label profile__underline">
          <input type="text" className="profile__input" defaultValue="User" />
        </label>
        <label className="profile__label">
          <input type="text" className="profile__input" defaultValue="user@test.ru" />
        </label>
        <button type="submit" className="profile__submit" onClick={handleSubmit}>
          Редактировать
        </button>
      </form>
      <Link to="/sign-in" className="profile__logout">
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
