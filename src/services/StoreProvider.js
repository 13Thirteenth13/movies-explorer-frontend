import React, { createContext, useReducer, useMemo, useContext } from "react";

import { userState } from "./state/user.js";
import { movieState } from "./state/movie.js";
import { toolTipState } from "./state/toolTip.js";
import { userReducer } from "./reducers/user.js";
import { movieReducer } from "./reducers/movie.js";
import { toolTipReducer } from "./reducers/toolTip.js";


const globalState = {
  loggedIn: true,
  loading: false,
  user: { ...userState },
  movie: { ...movieState },
  toolTip: { ...toolTipState },
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

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducers, globalState);
  const contextValue = useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useStore() {
  return useContext(GlobalContext);
}
