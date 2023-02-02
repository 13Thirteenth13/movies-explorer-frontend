import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import { useStore } from "../../services/StoreProvider.js";

const SavedMovies = () => {
  const [state] = useStore();
  const { savedMovies } = state.movie;

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={savedMovies} />
    </main>
  );
}

export default SavedMovies;
