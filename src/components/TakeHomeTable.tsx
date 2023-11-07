import React from "react";
import { PAGE_SIZES, TakeHomeDataState } from "../contexts/TakeHomeData.tsx";

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
};

export const TakeHomeTable = ({
  columns,
  state,
  setPage,
  setPageSize,
}: TakeHomeTableProps) => (
  <>
    <table>
      <thead>
        <tr>
          {columns.map(({ fieldName, title, label }) => (
            <th key={fieldName} title={title}>
              {label}
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
  </>
);
