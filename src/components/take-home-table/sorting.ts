import { SetSort, TakeHomeDataState } from "../../contexts/TakeHomeData.tsx";

export const setNextSort = (
  fieldName: string,
  state: TakeHomeDataState,
  setSort: SetSort,
) => {
  if (state.sortField === fieldName) {
    // already sorting by this field
    if (state.sortAscending) {
      setSort(fieldName, false);
    } else {
      // clear sorting
      setSort(undefined, true);
    }
  } else {
    // begin sorting by this field
    setSort(fieldName, true);
  }
};

export const nextSortForField = (
  fieldName: string,
  label: string,
  title: string | undefined,
  state: TakeHomeDataState,
) => {
  const field = title || label || fieldName;
  let sortProse;
  if (state.sortField === fieldName) {
    if (state.sortAscending) {
      sortProse = `Sort by ${field} descending`;
    } else {
      sortProse = `Clear sorting`;
    }
  } else {
    sortProse = `Sort by ${field} ascending`;
  }
  return sortProse;
};

export const sortIndicator = (state: TakeHomeDataState, fieldName: string) => {
  if (state.sortField === fieldName) {
    return state.sortAscending ? "⬆️" : "⬇️";
  } else {
    return "";
  }
};
