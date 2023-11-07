export type TakeHomeTableColumn = {
  fieldName: string;
  label: string;
  title?: string;
  sortable?: boolean;
  filterable?: boolean;
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
          {columns.map(({ fieldName }) => (
            <td key={fieldName}>{row[fieldName]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
