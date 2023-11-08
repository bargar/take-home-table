import { SyntheticEvent, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import styled from "styled-components";
import {
  DeselectItem,
  SelectItem,
  SetFilter,
  SetPage,
  SetPageSize,
  SetSort,
  TakeHomeDataState,
} from "./TakeHomeDataContext.tsx";
import { PAGE_SIZES, Identifiable } from "../../data/api.ts";
import { TakeHomeRenderer } from "./TakeHomeRenderer.tsx";
import { nextSortForField, setNextSort, sortIndicator } from "./sorting.ts";

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
  autoFocus?: boolean;
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
  autoFocus = true,
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
        <FilterInput
          placeholder={`Filter by ${filterColumn.label}`}
          onChange={(event: SyntheticEvent) =>
            setFilterInput((event.target as HTMLInputElement).value)
          }
          onKeyUp={(event: KeyboardEvent) => {
            if (event.key === "Escape") setFilterInput("");
          }}
          value={filterInput}
          autoFocus={autoFocus}
        />
      )}
      <Table>
        <thead>
          <HeaderRow>
            <ColumnHeader>&nbsp;</ColumnHeader>
            {columns.map(({ fieldName, title, label, sortable }) => (
              <ColumnHeader key={fieldName} title={title}>
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
              </ColumnHeader>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {state.isLoading ? (
            <tr>
              <td colSpan={columnCountIncludingSelector}>
                <LoadingIndicator>Loading...</LoadingIndicator>
              </td>
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
                      <Renderer value={row[fieldName]} item={row}>
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
      </Table>
      {!state.isLoading && (
        <Footer>
          <div>
            Page Size
            {PAGE_SIZES.map((pageSize) => (
              <FooterButton
                key={pageSize}
                onClick={() => setPageSize(pageSize)}
                disabled={state.pageSize === pageSize}
              >
                {pageSize}
              </FooterButton>
            ))}
          </div>
          <div>
            <FooterButton
              onClick={() => setPage(state.page - 1)}
              disabled={state.page <= 1}
            >
              ⬅️
            </FooterButton>
            Page {state.page} / {state.totalPages}
            <FooterButton
              onClick={() => setPage(state.page + 1)}
              disabled={state.page >= state.totalPages}
            >
              ➡️
            </FooterButton>
          </div>
        </Footer>
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

const Table = styled.table`
  width: 100%;
`;

const HeaderRow = styled.tr`
  border-bottom: 2px solid gray;
  background-color: dimgray;
`;

const ColumnHeader = styled.th`
  padding: 0.5em;
  font-weight: bold;
  button {
    margin: auto;
  }
`;

const ColumnHeaderButton = styled.button`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const SortIndicator = styled.div`
  margin-left: 0.5em;
`;

const FilterInput = styled.input`
  float: right;
  padding: 0.5em;
  background-color: black;
  color: white;
  border: none;
  font-size: 16px;
  margin: 1em;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: dimgray;
  padding: 0.5em;
`;

const FooterButton = styled.button`
  margin: 0 0.5em;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 200px;
`;
