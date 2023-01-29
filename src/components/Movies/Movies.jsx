import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";

const Movies = ({ moviesList, loading }) => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} loading={loading} />
    </main>
  );
}

export default Movies;
