import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  DeselectItem,
  SelectItem,
  SetFilter,
  SetPage,
  SetPageSize,
  SetSort,
  TakeHomeDataState,
} from "../contexts/TakeHomeData.tsx";
import { PAGE_SIZES } from "../data/api.ts";
import styled from "styled-components";
import { Identifiable } from "../data/api.ts";

type RendererProps = {
  children: React.ReactNode;
  value: string | number;
};
export type TakeHomeRenderer = React.FunctionComponent<RendererProps>;

export type TakeHomeTableColumn = {
  fieldName: string;
  label: string;
  title?: string;
  sortable?: boolean;
  filterable?: boolean;
  Renderer?: TakeHomeRenderer;
};

type TakeHomeTableProps = {
  columns: TakeHomeTableColumn[];
  state: TakeHomeDataState;
  setPageSize: SetPageSize;
  setPage: SetPage;
  setSort: SetSort;
  setFilter: SetFilter;
  selectItem: SelectItem;
  deselectItem: DeselectItem;
  // override this for custom logic to determine the ID of an item
  idForItem?: (item: Identifiable) => string;
};

const setNextSort = (
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

const nextSortForField = (
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

const sortIndicator = (state: TakeHomeDataState, fieldName: string) => {
  if (state.sortField === fieldName) {
    return state.sortAscending ? "⬆️" : "⬇️";
  } else {
    return "";
  }
};

export const TakeHomeTable = ({
  columns,
  state,
  setPage,
  setPageSize,
  setSort,
  setFilter,
  selectItem,
  deselectItem,
  idForItem = (item) => item.id,
}: TakeHomeTableProps) => {
  const filterColumn = columns.find((column) => column.filterable);
  const [filterInput, setFilterInput] = useState("");
  const debouncedFilterInput = useDebounce(filterInput, 300);
  const columnCountIncludingSelector = columns.length + 1;
  useEffect(() => {
    if (filterColumn) {
      setFilter(filterColumn.fieldName, debouncedFilterInput);
    }
  }, [debouncedFilterInput, filterColumn, filterColumn?.fieldName, setFilter]);
  return (
    <>
      {filterColumn && (
        <input
          placeholder={`Filter by ${filterColumn.label}`}
          onChange={(event) => setFilterInput(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Escape") setFilterInput("");
          }}
          value={filterInput}
          autoFocus
        />
      )}
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            {columns.map(({ fieldName, title, label, sortable }) => (
              <th key={fieldName} title={title}>
                {sortable ? (
                  <ColumnHeaderButton
                    title={nextSortForField(fieldName, label, title, state)}
                    onClick={() => setNextSort(fieldName, state, setSort)}
                  >
                    {label}{" "}
                    <SortIndicator>
                      {sortIndicator(state, fieldName)}
                    </SortIndicator>
                  </ColumnHeaderButton>
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.isLoading ? (
            <tr>
              <td colSpan={columnCountIncludingSelector}>Loading...</td>
            </tr>
          ) : (
            state.data.map((row) => (
              <tr key={JSON.stringify(row)}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      event.target.checked
                        ? selectItem(idForItem(row), row)
                        : deselectItem(idForItem(row))
                    }
                    checked={state.selected[idForItem(row)] || false}
                  />
                </td>
                {columns.map(({ fieldName, Renderer }) => (
                  <td key={fieldName}>
                    {Renderer ? (
                      <Renderer value={row[fieldName]}>
                        {row[fieldName]}
                      </Renderer>
                    ) : (
                      row[fieldName]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!state.isLoading && (
        <div>
          <button
            onClick={() => setPage(state.page - 1)}
            disabled={state.page <= 1}
          >
            ⬅️
          </button>
          Page {state.page} / {state.totalPages}
          <button
            onClick={() => setPage(state.page + 1)}
            disabled={state.page >= state.totalPages}
          >
            ➡️
          </button>
          <hr />
          Page Size {state.pageSize}
          {PAGE_SIZES.map((pageSize) => (
            <button key={pageSize} onClick={() => setPageSize(pageSize)}>
              {pageSize}
            </button>
          ))}
        </div>
      )}
      {state.selected && Object.keys(state.selected).length > 0 && (
        <>
          <h2>Selected</h2>
          <pre>{JSON.stringify(state.selected, null, " ")}</pre>
        </>
      )}
    </>
  );
};

const ColumnHeaderButton = styled.button`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const SortIndicator = styled.div`
  margin-left: 0.5em;
`;
