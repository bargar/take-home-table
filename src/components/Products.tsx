import {
  TakeHomeTable,
  TakeHomeTableColumn,
} from "./take-home-table/TakeHomeTable.tsx";
import { useContext } from "react";
import { TakeHomeDataContext } from "./take-home-table/TakeHomeDataContext.tsx";
import PriceRenderer from "./take-home-table/field-renderers/PriceRenderer.tsx";
import RatingRenderer from "./take-home-table/field-renderers/RatingRenderer.tsx";
import ThumbnailRenderer from "./take-home-table/field-renderers/ThumbnailRenderer.tsx";
import TextRenderer from "./take-home-table/field-renderers/TextRenderer.tsx";

const columns: TakeHomeTableColumn[] = [
  {
    fieldName: "id",
    label: "ID",
    sortable: true,
  },
  {
    fieldName: "title",
    label: "Title",
    sortable: true,
    Renderer: TextRenderer,
  },
  {
    fieldName: "description",
    label: "Description",
    filterable: true,
    Renderer: TextRenderer,
  },
  {
    fieldName: "price",
    label: "Price",
    sortable: true,
    Renderer: PriceRenderer,
  },
  {
    fieldName: "rating",
    label: "Rating",
    title: "Rating out of 5",
    sortable: true,
    Renderer: RatingRenderer,
  },
  {
    fieldName: "stock",
    label: "Stock",
    sortable: true,
  },
  {
    fieldName: "brand",
    label: "Brand",
    sortable: true,
  },
  {
    fieldName: "thumbnail",
    label: "Thumbnail",
    Renderer: ThumbnailRenderer,
  },
];
const Products = () => {
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

export default Products;
