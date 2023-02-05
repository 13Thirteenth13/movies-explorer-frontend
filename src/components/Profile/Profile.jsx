import { useCallback, useEffect, useState } from "react";

import { logOut, updateUser, UPDATE_USER } from "../../services/actions/user.js";
import { useStore } from "../../services/StoreProvider.js";
import { isName, isEmail } from "../../utils/validation.js";
import { TOOL_TIP } from "../../services/actions/toolTip.js";
import { resMessages } from "../../utils/constants.js";


const Profile = () => {
  const [state, dispatch] = useStore();
  const userInfo = state.user;
  const [userData, setUserData] = useState({
    name: userInfo.name,
    email: userInfo.email,
  });
  const [buttonProps, setButtonProps] = useState({
    disabled: true,
    className: "profile__submit_disabled",
  });

  const checkEdit = useCallback(() => {
    if (userInfo.name !== userData.name || userInfo.email !== userData.email) {
      if (!isName(userInfo.name) && !isEmail(userInfo.email)) {
        setButtonProps({ disabled: false, className: "profile__submit" });
        return;
      }
    }
    setButtonProps({ disabled: true, className: "profile__submit_disabled" });
  }, [userData, userInfo]);

  useEffect(() => {
    checkEdit();
  }, [checkEdit]);

  const handleChange = (e) => {
    dispatch({ type: UPDATE_USER, user: { [e.target.name]: e.target.value } });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(dispatch, userInfo).then(({ success, statusCode = 0 }) => {
      if (success) {
        dispatch({
          type: TOOL_TIP,
          success: true,
          message: "Данные пользователя успешно изменены!",
        });
      } else {
        dispatch({
          type: TOOL_TIP,
          success: false,
          message: resMessages[statusCode],
        });
      }
    });
    setUserData(userInfo);
  }

  const handleLogout = () => {
    logOut(dispatch);
    if (localStorage.getItem("moviesLocalState")) {
      localStorage.removeItem("moviesLocalState");
    }
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {userData.name}!</h1>
      <form action="submit" className="profile__form">
        <label className="profile__label profile__underline">
          <input
            name="name"
            type="text"
            className="profile__input"
            value={userInfo.name}
            onChange={handleChange}
            minLength={2}
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
          className={buttonProps.className}
          onClick={handleSubmit}
          disabled={buttonProps.disabled}
        >
          Редактировать
        </button>
      </form>
      <button
        className="profile__logout"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
