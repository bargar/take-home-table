import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import styled from "styled-components";
import { TakeHomeDataContext } from "./TakeHomeDataContext.tsx";
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
  // the heart of the table configuration, specifies what data will be included and how it will display and behave
  columns: TakeHomeTableColumn[];
  // override this for custom logic to determine the ID of an item
  idForItem?: (item: Identifiable) => string;
  // optional, defaults to true so filtering field is autofocused
  // provided to allow for better control when multiple instances rendered at a time
  autoFocus?: boolean;
};

export const TakeHomeTable = ({
  columns,
  idForItem = (item) => item.id,
  autoFocus = true,
}: TakeHomeTableProps) => {
  // helper methods for updating table state come from the surrounding context
  const {
    setPage,
    setPageSize,
    setSort,
    setFilter,
    selectItem,
    deselectItem,
    state,
  } = useContext(TakeHomeDataContext);

  // filter column and state, if relevant
  const filterColumn = columns.find((column) => column.filterable);
  const [filterInput, setFilterInput] = useState("");
  const debouncedFilterInput = useDebounce(filterInput, 300);

  useEffect(() => {
    if (filterColumn) {
      // update the table filtering state and data based on debounced changes the user enters in the filter text input
      setFilter(filterColumn.fieldName, debouncedFilterInput);
    }
  }, [debouncedFilterInput, filterColumn, filterColumn?.fieldName, setFilter]);

  return (
    <Container>
      {state.isLoading && <Overlay>Loading...</Overlay>}
      {/* filtering */}
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
      {/* table */}
      <Table>
        <thead>
          {/*header including column labels and sorting buttons */}
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
          {state.data.map((row) => (
            <tr key={JSON.stringify(row)}>
              {/* item selection UI i.e. a checkbox at the beginning of each row */}
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
              {/* one cell for each item field configured as a column, either raw value or special rendering */}
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
          ))}
        </tbody>
      </Table>
      {/* pagination UI */}
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
      {state.selected && Object.keys(state.selected).length > 0 && (
        // selected items are displayed here
        <>
          <h2>Selected</h2>
          <pre>{JSON.stringify(state.selected, null, " ")}</pre>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  opacity: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

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
