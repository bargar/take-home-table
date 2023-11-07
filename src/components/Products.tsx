import {
  TakeHomeRenderer,
  TakeHomeTable,
  TakeHomeTableColumn,
} from "./TakeHomeTable.tsx";
import { useContext, useEffect } from "react";
import { TakeHomeDataContext } from "../contexts/TakeHomeData.tsx";

const formatPrice = (price: string | number) => `$${price}`;
const PriceRenderer: TakeHomeRenderer = ({ value }) => formatPrice(value);
const RatingRenderer: TakeHomeRenderer = ({ value }) => {
  const maxStars = 5;
  const starCount = Math.round(value as number);
  const stars = "".padEnd(starCount, "★").padEnd(maxStars, "☆");
  return <div title={`${value} out of ${maxStars}`}>{stars}</div>;
};
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
  // {
  //   fieldName: "thumbnail",
  //   label: "Thumbnail",
  // },
  // {
  //   fieldName: "images",
  //   label: "Images",
  // },
];
const Products = () => {
  const { load, setPage, setPageSize, setSort, state } =
    useContext(TakeHomeDataContext);

  // initial load
  useEffect(() => {
    load();
  }, []);

  return (
    <TakeHomeTable
      columns={columns}
      state={state}
      setPage={setPage}
      setPageSize={setPageSize}
      setSort={setSort}
    />
  );
};

export default Products;
