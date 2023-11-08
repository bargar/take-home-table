import React, { createContext, useCallback, useReducer } from "react";
import { artificialDelay } from "../util.ts";
import { mockFetch } from "../data/api.ts";

export type Load = (
  page?: number,
  pageSize?: number,
  sortField?: string,
  sortAscending?: boolean,
  filterField?: string,
  filterValue?: string,
) => void;
export type SetPage = (page: number) => void;
export type SetPageSize = (pageSize: number) => void;
export type SetSort = (field: string | undefined, isAscending: boolean) => void;
export type SetFilter = (
  field: string | undefined,
  value: string | undefined,
) => void;

type TakeHomeDataContextValue = {
  load: Load;
  setPage: SetPage;
  setPageSize: SetPageSize;
  setSort: SetSort;
  setFilter: SetFilter;
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
  filterField: undefined,
  filterValue: undefined,
};

export const TakeHomeDataContext = createContext<TakeHomeDataContextValue>({
  load: () => {},
  setPage: () => {},
  setPageSize: () => {},
  setSort: () => {},
  setFilter: () => {},
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
  filterField: string | undefined;
  filterValue: string | undefined;
};

const SET_DATA = "SET_DATA";
const SET_LOADING = "SET_LOADING";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_SORT = "SET_SORT";
const SET_FILTER = "SET_FILTER";
type Action =
  | { type: "SET_DATA"; payload: { data: any[]; total: number } }
  | { type: "SET_LOADING" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | {
      type: "SET_SORT";
      payload: { field: string | undefined; isAscending: boolean };
    }
  | {
      type: "SET_FILTER";
      payload: { field: string | undefined; value: string | undefined };
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
      console.log(
        "setting total pages to",
        action.payload.total,
        "/",
        state.pageSize,
        "=",
        action.payload.total / state.pageSize,
      );
      newState = {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
        totalPages: Math.ceil(action.payload.total / state.pageSize),
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
        totalPages: Math.ceil(state.total / action.payload),
      };
      break;
    case SET_SORT:
      newState = {
        ...state,
        sortField: action.payload.field,
        sortAscending: action.payload.isAscending,
      };
      break;
    case SET_FILTER:
      newState = {
        ...state,
        filterField: action.payload.field,
        filterValue: action.payload.value,
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

  const load: Load = useCallback(
    (
      page: number = 1,
      pageSize: number = 10,
      sortField: string | undefined = undefined,
      sortAscending: boolean = true,
      filterField: string | undefined = undefined,
      filterValue: string | undefined = undefined,
    ) => {
      (async () => {
        dispatch({ type: SET_LOADING });
        await artificialDelay();
        const response = await mockFetch("products", {
          page,
          pageSize,
          sortField,
          sortAscending,
          filterField,
          filterValue,
        });
        console.log("response", response);
        const { data, total } = response;
        dispatch({ type: SET_DATA, payload: { data, total } });
      })();
    },
    [dispatch],
  );

  const setPage: SetPage = useCallback(
    (page: number) => {
      dispatch({ type: SET_PAGE, payload: page });
      load(
        page,
        state.pageSize,
        state.sortField,
        state.sortAscending,
        state.filterField,
        state.filterValue,
      );
    },
    [
      load,
      state.filterField,
      state.filterValue,
      state.pageSize,
      state.sortAscending,
      state.sortField,
    ],
  );

  const setPageSize: SetPageSize = useCallback(
    (pageSize: number) => {
      dispatch({ type: SET_PAGE_SIZE, payload: pageSize });
      load(
        1,
        pageSize,
        state.sortField,
        state.sortAscending,
        state.filterField,
        state.filterValue,
      );
    },
    [
      load,
      state.filterField,
      state.filterValue,
      state.sortAscending,
      state.sortField,
    ],
  );

  const setSort: SetSort = useCallback(
    (field: string | undefined, isAscending: boolean) => {
      dispatch({ type: SET_SORT, payload: { field, isAscending } });
      load(
        state.page,
        state.pageSize,
        field,
        isAscending,
        state.filterField,
        state.filterValue,
      );
    },
    [load, state.filterField, state.filterValue, state.page, state.pageSize],
  );

  const setFilter: SetFilter = useCallback(
    (field: string | undefined, value: string | undefined) => {
      dispatch({ type: SET_FILTER, payload: { field, value } });
      dispatch({ type: SET_PAGE, payload: 1 });
      load(
        1,
        state.pageSize,
        state.sortField,
        state.sortAscending,
        field,
        value,
      );
    },
    [load, state.pageSize, state.sortAscending, state.sortField],
  );

  return (
    <TakeHomeDataContext.Provider
      value={{ load, setPage, setPageSize, setSort, setFilter, state }}
    >
      {children}
    </TakeHomeDataContext.Provider>
  );
};
