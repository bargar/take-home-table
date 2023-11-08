import React, { createContext, useCallback, useReducer } from "react";
import { mockFetch, Resource } from "../../data/api.ts";

const DEFAULT_PAGE_SIZE = 5;

// all state for TakeHomeTable component is contained here
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
  selected: Record<string, any>;
};

// types for helper methods provided to TakeHomeTable component to update table state
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
export type SelectItem = (id: string, item: any) => void;
export type DeselectItem = (id: string) => void;

type TakeHomeDataContextValue = {
  load: Load;
  setPage: SetPage;
  setPageSize: SetPageSize;
  setSort: SetSort;
  setFilter: SetFilter;
  selectItem: SelectItem;
  deselectItem: DeselectItem;
  state: TakeHomeDataState;
};

const initialState: TakeHomeDataState = {
  isLoading: false,
  data: [],
  total: 0,
  asOf: Date.now(),
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  totalPages: 0,
  sortField: undefined,
  sortAscending: true,
  filterField: undefined,
  filterValue: undefined,
  selected: {},
};

export const TakeHomeDataContext = createContext<TakeHomeDataContextValue>({
  load: () => {},
  setPage: () => {},
  setPageSize: () => {},
  setSort: () => {},
  setFilter: () => {},
  selectItem: () => {},
  deselectItem: () => {},
  state: initialState,
});

// table state is managed via reducer

const SET_DATA = "SET_DATA";
const SET_LOADING = "SET_LOADING";
const SET_PAGE = "SET_PAGE";
const SET_PAGE_SIZE = "SET_PAGE_SIZE";
const SET_SORT = "SET_SORT";
const SET_FILTER = "SET_FILTER";
const SELECT_ITEM = "SELECT_ITEM";
const DESELECT_ITEM = "DESELECT_ITEM";

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
    }
  | { type: "SELECT_ITEM"; payload: { id: string; item: any } }
  | { type: "DESELECT_ITEM"; payload: string };

/**
 * Since the TakeHomeTable state is non-trivial,  we manage with a reducer.
 */
const reducer = (
  state: TakeHomeDataState,
  action: Action,
): TakeHomeDataState => {
  const { type } = action;
  let newState;
  const newlySelected = Object.assign({}, state.selected);
  switch (type) {
    case SET_LOADING:
      newState = { ...state, isLoading: true };
      break;
    case SET_DATA:
      newState = {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
        // calculate number of pages based on result set and page size
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
        page: 1, // when page size is changed, return to page 1
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
        selected: {},
      };
      break;
    case SELECT_ITEM:
      newState = {
        ...state,
        selected: {
          ...state.selected,
          // add item to map of selected items by id
          [action.payload.id]: action.payload.item,
        },
      };
      break;
    case DESELECT_ITEM:
      // remove item from map of selected items by id
      delete newlySelected[action.payload];
      newState = {
        ...state,
        selected: newlySelected,
      };
      break;
    default:
      console.warn("unhandled action", action);
      newState = state;
  }
  return newState;
};

/**
 * Provider componment that takes an api resource and exposes TakeHomeTable state and methods to update it.
 * @param resource e.g. 'products', 'users'
 * @param children the wrapped TakeHomeTable whose state will be managed by this context.
 * @constructor
 */
export const TakeHomeDataProvider = ({
  resource,
  children,
}: {
  resource: Resource;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Load new data for the table.
   */
  const load: Load = useCallback(
    (
      page: number = 1,
      pageSize: number = DEFAULT_PAGE_SIZE,
      sortField: string | undefined = undefined,
      sortAscending: boolean = true,
      filterField: string | undefined = undefined,
      filterValue: string | undefined = undefined,
    ) => {
      (async () => {
        dispatch({ type: SET_LOADING });
        try {
          const response = await mockFetch(resource, {
            page,
            pageSize,
            sortField,
            sortAscending,
            filterField,
            filterValue,
          });
          const { data, total } = response;
          dispatch({ type: SET_DATA, payload: { data, total } });
        } catch (err) {
          // on error, clear data
          dispatch({ type: SET_DATA, payload: { data: [], total: 0 } });
        }
      })();
    },
    [resource],
  );

  /**
   * Update the current page and reload data.
   */
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

  /**
   * Change the amount of items returned in one page and reload data.
   */
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

  /**
   * Update the current sort field and or direction and reload.
   */
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

  /**
   * Update the filter field and or value and reload.
   */
  const setFilter: SetFilter = useCallback(
    (field: string | undefined, value: string | undefined) => {
      if (state.filterField === field && state.filterValue === value) {
        // skip filter, it's already set for this field and value
        return;
      }
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
    [
      load,
      state.filterField,
      state.filterValue,
      state.pageSize,
      state.sortAscending,
      state.sortField,
    ],
  );

  /**
   * Add to the set of currently selected items.
   */
  const selectItem: SelectItem = useCallback((id: string, item: any) => {
    dispatch({ type: SELECT_ITEM, payload: { id, item } });
  }, []);

  /**
   * Remove from the set of currently selected items.
   */
  const deselectItem: DeselectItem = useCallback((id: string) => {
    dispatch({ type: DESELECT_ITEM, payload: id });
  }, []);

  return (
    <TakeHomeDataContext.Provider
      value={{
        load,
        setPage,
        setPageSize,
        setSort,
        setFilter,
        selectItem,
        deselectItem,
        state,
      }}
    >
      {children}
    </TakeHomeDataContext.Provider>
  );
};
