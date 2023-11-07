import React from "react";
import { TakeHomeDataState } from "../contexts/TakeHomeData.tsx";

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
};

export const TakeHomeTable = ({ columns, state }: TakeHomeTableProps) => (
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
);
