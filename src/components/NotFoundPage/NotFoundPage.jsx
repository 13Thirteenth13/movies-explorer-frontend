import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  }

  return (
    <section className="error">
      <h1 className="error__title">404</h1>
      <p className="error__message">Страница не найдена</p>
      <button className="error__button" onClick={handleClickBack}>
        Назад
      </button>
    </section>
  );
};

export default NotFoundPage;
