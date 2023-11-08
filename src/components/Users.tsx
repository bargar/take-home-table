import {
  TakeHomeTable,
  TakeHomeTableColumn,
} from "./take-home-table/TakeHomeTable.tsx";
import ThumbnailRenderer from "./take-home-table/field-renderers/ThumbnailRenderer.tsx";
import AddressRenderer from "./take-home-table/field-renderers/AddressRenderer.tsx";
import { TakeHomeDataProvider } from "./take-home-table/TakeHomeDataContext.tsx";
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

const Users = () => (
  <TakeHomeDataProvider resource="users">
    <TakeHomeTable columns={columns} autoFocus={false} />
  </TakeHomeDataProvider>
);

export default Users;
