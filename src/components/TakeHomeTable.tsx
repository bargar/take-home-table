import React from "react";
import { TakeHomeDataState } from "../contexts/TakeHomeData.tsx";
import { PAGE_SIZES } from "../data/api.ts";
import styled from "styled-components";

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
  setPageSize: (pageSize: number) => void;
  setPage: (page: number) => void;
  setSort: (field: string | undefined, isAscending: boolean) => void;
};

const setNextSort = (
  state: TakeHomeDataState,
  setSort: (field: string | undefined, isAscending: boolean) => void,
  fieldName: string,
) => {
  let sortProse;
  if (state.sortField === fieldName) {
    // already sorting by this field
    if (state.sortAscending) {
      setSort(fieldName, false);
      sortProse = `Sort by ${fieldName} descending`;
    } else {
      // clear sorting
      setSort(undefined, true);
      sortProse = `Clear sorting`;
    }
  } else {
    setSort(fieldName, true);
    sortProse = `Sort by ${fieldName} ascending`;
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
}: TakeHomeTableProps) => (
  <>
    <table>
      <thead>
        <tr>
          {columns.map(({ fieldName, title, label, sortable }) => (
            <th key={fieldName} title={title}>
              {sortable ? (
                <ColumnHeaderButton
                  onClick={() => setNextSort(state, setSort, fieldName)}
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
            <td colSpan={columns.length}>Loading...</td>
          </tr>
        ) : (
          state.data.map((row) => (
            <tr key={JSON.stringify(row)}>
              {columns.map(({ fieldName, Renderer }) => (
                <td key={fieldName}>
                  {Renderer ? (
                    <Renderer value={row[fieldName]}>{row[fieldName]}</Renderer>
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
  </>
);

const ColumnHeaderButton = styled.button`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const SortIndicator = styled.div`
  margin-left: 0.5em;
`;
