import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { useStore } from "../../services/StoreProvider.js";

const Movies = () => {
  const [state] = useStore();
  const { moviesList } = state.movie;

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} />
    </main>
  );
}

export default Movies;
