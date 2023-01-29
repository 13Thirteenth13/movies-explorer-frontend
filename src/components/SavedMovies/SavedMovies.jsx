import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";

const SavedMovies = ({ moviesList }) => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} loading={false} />
    </main>
  );
}

export default SavedMovies;
