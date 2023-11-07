import React, { createContext, useCallback, useReducer } from "react";
import { artificialDelay } from "../util.ts";

type TakeHomeDataContextValue = {
  load: () => void;
  state: TakeHomeDataState;
};

const initialState: TakeHomeDataState = {
  isLoading: false,
  data: [],
  asOf: Date.now(),
};

export const TakeHomeDataContext = createContext<TakeHomeDataContextValue>({
  load: () => {},
  state: initialState,
});

export type TakeHomeDataState = {
  isLoading: boolean;
  data: any[];
  asOf: number;
};

type ACTIONS = "SET_DATA" | "SET_LOADING";
const SET_DATA = "SET_DATA";
const SET_LOADING = "SET_LOADING";

const reducer = (
  state: TakeHomeDataState,
  action: { payload?: any[]; type?: ACTIONS },
): TakeHomeDataState => {
  const { type } = action;
  let newState;
  switch (type) {
    case SET_LOADING:
      newState = { ...state, isLoading: true };
      break;
    case SET_DATA:
      newState = {
        ...state,
        data: action.payload || [],
        asOf: Date.now(),
        isLoading: false,
      };
      break;
    default:
      console.warn("unhandled action", action);
      newState = state;
  }
  return newState;
};

export const TakeHomeDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = useCallback(() => {
    (async () => {
      dispatch({ type: SET_LOADING });
      await artificialDelay();
      const response = await fetch("https://dummyjson.com/products");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: SET_DATA, payload: data.products });
      } else {
        console.error("Error loading data");
      }
    })();
  }, [dispatch]);

  return (
    <TakeHomeDataContext.Provider value={{ load, state }}>
      {children}
    </TakeHomeDataContext.Provider>
  );
};
