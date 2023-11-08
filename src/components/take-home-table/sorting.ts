import { SetSort, TakeHomeDataState } from "./TakeHomeDataContext.tsx";

/**
 * Set appropriate next sorting:
 *  * if unsorted by field, sort by field ascending
 *  * if already sorted by field ascending, sort by same field descending
 *  * if already sorted by field descending, clear sort and revert to natural ordering.
 *
 * @param fieldName
 * @param state
 * @param setSort
 */
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

/**
 * Prose description of what next sort would be when clicking on a field's column, for benefit of the user.
 * @param fieldName
 * @param label
 * @param title
 * @param state
 */
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
