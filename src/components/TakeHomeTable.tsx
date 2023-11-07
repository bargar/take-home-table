import React from "react";

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
  data: any[];
};

export const TakeHomeTable = ({ columns, data = [] }: TakeHomeTableProps) => (
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
      {data.map((row) => (
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
      ))}
    </tbody>
  </table>
);
