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
  },
  {
    fieldName: "title",
    label: "Title",
  },
  {
    fieldName: "description",
    label: "Description",
  },
  {
    fieldName: "price",
    label: "Price",
    Renderer: PriceRenderer,
  },
  {
    fieldName: "discountPercentage",
    label: "Discount",
    Renderer: PriceRenderer,
  },
  {
    fieldName: "rating",
    label: "Rating",
    title: "Rating out of 5",
    Renderer: RatingRenderer,
  },
  {
    fieldName: "stock",
    label: "Stock",
  },
  {
    fieldName: "brand",
    label: "Brand",
  },
  {
    fieldName: "category",
    label: "Category",
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
  const {
    load,
    state: { data },
  } = useContext(TakeHomeDataContext);

  // initial load
  useEffect(() => {
    load();
  }, []);

  return <TakeHomeTable columns={columns} data={data} />;
};

export default Products;
