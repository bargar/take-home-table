import React, { createContext, useCallback, useReducer } from "react";
import { artificialDelay } from "../util.ts";
import { mockFetch } from "../data/api.ts";

type TakeHomeDataContextValue = {
  load: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (field: string | undefined, isAscending: boolean) => void;
  state: TakeHomeDataState;
};

const initialState: TakeHomeDataState = {
  isLoading: false,
  data: [],
  total: 0,
  asOf: Date.now(),
  page: 1,
  pageSize: 10,
  totalPages: 0,
  sortField: undefined,
  sortAscending: true,
};

export const TakeHomeDataContext = createContext<TakeHomeDataContextValue>({
  load: () => {},
  setPage: () => {},
  setPageSize: () => {},
  setSort: () => {},
  state: initialState,
});

export type TakeHomeDataState = {
  isLoading: boolean;
  data: any[];
  total: number;
  asOf: number;
  page: number;
  pageSize: number;
  totalPages: number;
  sortField: string | undefined;
  sortAscending: boolean;
};

const SET_DATA = "SET_DATA";
const SET_LOADING = "SET_LOADING";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_SORT = "SET_SORT";
type Action =
  | { type: "SET_DATA"; payload: { data: any[]; total: number } }
  | { type: "SET_LOADING" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | {
      type: "SET_SORT";
      payload: { field: string | undefined; isAscending: boolean };
    };

const reducer = (
  state: TakeHomeDataState,
  action: Action,
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
        data: action.payload.data,
        total: action.payload.total,
        totalPages: action.payload.total / state.pageSize,
        asOf: Date.now(),
        isLoading: false,
      };
      break;
    case SET_PAGE:
      newState = {
        ...state,
        page: action.payload,
      };
      break;
    case SET_PAGE_SIZE:
      newState = {
        ...state,
        page: 1,
        pageSize: action.payload,
        totalPages: state.total / action.payload,
      };
      break;
    case SET_SORT:
      newState = {
        ...state,
        sortField: action.payload.field,
        sortAscending: action.payload.isAscending,
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

  const load = useCallback(
    (
      page: number = 1,
      pageSize: number = 10,
      sortField: string | undefined = undefined,
      sortAscending: boolean = true,
    ) => {
      (async () => {
        dispatch({ type: SET_LOADING });
        await artificialDelay();
        const response = await mockFetch("products", {
          page,
          pageSize,
          sortField,
          sortAscending,
        });
        console.log("response", response);
        const { data, total } = response;
        dispatch({ type: SET_DATA, payload: { data, total } });
      })();
    },
    [dispatch],
  );

  const setPage = useCallback(
    (page: number) => {
      dispatch({ type: SET_PAGE, payload: page });
      load(page, state.pageSize);
    },
    [dispatch, load, state.pageSize],
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      dispatch({ type: SET_PAGE_SIZE, payload: pageSize });
      load(1, pageSize);
    },
    [dispatch, load],
  );

  const setSort = useCallback(
    (field: string | undefined, isAscending: boolean) => {
      dispatch({ type: SET_SORT, payload: { field, isAscending } });
      load(state.page, state.pageSize, field, isAscending);
    },
    [dispatch, load, state.page, state.pageSize],
  );

  return (
    <TakeHomeDataContext.Provider
      value={{ load, setPage, setPageSize, setSort, state }}
    >
      {children}
    </TakeHomeDataContext.Provider>
  );
};
