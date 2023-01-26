import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";

function SavedMovies({ moviesList }) {
  return (
    <main className="movies">
      <MoviesCardList moviesList={moviesList} loading={false} />
    </main>
  );
}

export default SavedMovies;
