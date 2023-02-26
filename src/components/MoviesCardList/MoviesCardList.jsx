import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import Preloader from "../Preloader/Preloader.jsx"

const MoviesCardList = (props) => {
  const { cards, searchMovies, saveMovie, preloader } = props;

  return (
    <div className="cards">
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <div className="cards__list">
            {cards.map((card) =>
              <MoviesCard
                key={card.movieId}
                card={card}
                saveMovie={saveMovie}
              />
            )}
            {cards.length === 0 && searchMovies && !preloader &&
              <span className='cards__button'>Ничего не найдено</span>}
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
