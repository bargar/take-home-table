import { TakeHomeTable, TakeHomeTableColumn } from "./TakeHomeTable.tsx";
import { useContext } from "react";
import { TakeHomeDataContext } from "../contexts/TakeHomeData.tsx";
import PriceRenderer from "./field-renderers/PriceRenderer.tsx";
import RatingRenderer from "./field-renderers/RatingRenderer.tsx";
import ThumbnailRenderer from "./field-renderers/ThumbnailRenderer.tsx";

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
  },
  {
    fieldName: "description",
    label: "Description",
    filterable: true,
  },
  {
    fieldName: "price",
    label: "Price",
    sortable: true,
    Renderer: PriceRenderer,
  },
  {
    fieldName: "discountPercentage",
    label: "Discount",
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
    fieldName: "category",
    label: "Category",
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
