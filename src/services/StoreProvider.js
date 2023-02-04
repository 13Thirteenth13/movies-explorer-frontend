import React, { createContext, useReducer, useMemo, useContext } from "react";

import { userReducer } from "./reducers/user.js";
import { movieReducer } from "./reducers/movie.js";
import { toolTipReducer } from "./reducers/toolTip.js";


const globalState = {
  loggedIn: false,
  loading: false,
  user: { name: "", email: "", _id: "" },
  movie: {
    moviesList: [],
    savedMovies: [],
    filterShortFilms: false,
    searchText: "",
    notFound: "",
    showedMovies: 0,
  },
  toolTip: { message: "", isOpen: false, success: true },
};

const GlobalContext = createContext(globalState);

const reducers = (state, action) => {
  return {
    ...state,
    ...[userReducer, movieReducer, toolTipReducer].reduce(
      (objState, reducer) => ({ ...objState, ...reducer(objState, action) }),
      state
    ),
  };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, globalState);
  const contextValue = useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useStore = () => {
  return useContext(GlobalContext);
}
