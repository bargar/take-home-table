import "./App.css";
import styled from "styled-components";
import {
  TakeHomeTable,
  TakeHomeTableColumn,
} from "./components/TakeHomeTable.tsx";
import products from "./data/products.ts";

function App() {
  return (
    <>
      <Logo>🧮</Logo>
      <h1>take-home-table</h1>
      <TakeHomeTable columns={columns} data={products.products} />
    </>
  );
}

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
  },
  {
    fieldName: "discountPercentage",
    label: "Discount",
  },
  {
    fieldName: "rating",
    label: "Rating",
    title: "Rating out of 5",
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

const Logo = styled.div`
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  font-size: 96px;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

export default App;
