import { Link } from "react-router-dom";

import { logOut, updateUser } from "../../services/actions/user.js";
import { useStore } from "../../services/StoreProvider.js";

const Profile = () => {
  const [state, dispatch] = useStore();
  const userInfo = state.user;

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_USER",
      user: { [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(dispatch, state.user);
  };

  const handleLogout = () => {
    logOut(dispatch);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {userInfo.name}!</h1>
      <form action="submit" className="profile__form">
        <label className="profile__label profile__underline">
          <input
            name="name"
            type="text"
            className="profile__input"
            value={userInfo.name}
            onChange={handleChange}
          />
        </label>
        <label className="profile__label">
          <input
            name="email"
            type="text"
            className="profile__input"
            value={userInfo.email}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="profile__submit"
          onClick={handleSubmit}
        >
          Редактировать
        </button>
      </form>
      <Link
        to="/sign-in"
        className="profile__logout"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
