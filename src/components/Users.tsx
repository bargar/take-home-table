import { TakeHomeTable, TakeHomeTableColumn } from "./TakeHomeTable.tsx";
import { useContext } from "react";
import { TakeHomeDataContext } from "../contexts/TakeHomeData.tsx";
import ThumbnailRenderer from "./field-renderers/ThumbnailRenderer.tsx";
import AddressRenderer from "./field-renderers/AddressRenderer.tsx";
const columns: TakeHomeTableColumn[] = [
  {
    fieldName: "id",
    label: "ID",
    sortable: true,
  },
  {
    fieldName: "firstName",
    label: "First",
    sortable: true,
  },
  {
    fieldName: "lastName",
    label: "Last",
    filterable: true,
  },
  {
    fieldName: "age",
    label: "Age",
    sortable: true,
  },
  {
    fieldName: "email",
    label: "Email",
    sortable: true,
  },
  {
    fieldName: "image",
    label: "Image",
    Renderer: ThumbnailRenderer,
  },
  {
    fieldName: "address",
    label: "Address",
    Renderer: AddressRenderer,
  },
];
const Users = () => {
  const {
    setPage,
    setPageSize,
    setSort,
    setFilter,
    selectItem,
    deselectItem,
    state,
  } = useContext(TakeHomeDataContext);

  return (
    <TakeHomeTable
      columns={columns}
      state={state}
      setPage={setPage}
      setPageSize={setPageSize}
      setSort={setSort}
      setFilter={setFilter}
      selectItem={selectItem}
      deselectItem={deselectItem}
    />
  );
};

export default Users;
