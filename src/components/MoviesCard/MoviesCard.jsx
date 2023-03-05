import { useLocation } from "react-router-dom";

const MoviesCard = (props) => {
  const { card, saveMovie } = props;
  const location = useLocation();
  const hours = card.duration >= 60 ? `${Math.floor(card.duration / 60)} ч ` : '';
  const minutes = card.duration === 60 ? '' : `${card.duration % 60} м`;
  const durationMovie = hours + minutes;

  const handleSaveMovie = () =>
    saveMovie(card);

  const favoriteButton =
    card.saved ? "card__favorite_active" : "card__favorite";

  return (
    <article className="card">
      <div className="card__header">
        <div>
          <h3 className="card__title">{card.nameRU}</h3>
          <p className="card__duration">{durationMovie}</p>
        </div>
        {(location.pathname === "/movies") &&
          <button
            className={favoriteButton}
            onClick={handleSaveMovie}>
          </button>}
        {(location.pathname === "/saved-movies") &&
          <button
            className='card__favorite card__favorite_delete'
            onClick={handleSaveMovie}>
          </button>}
      </div>
      <img
        className="card__image"
        src={card.thumbnail}
        alt={card.nameRU}
      />
    </article>
  );
};

export default MoviesCard;
