import "./App.css";
import styled from "styled-components";
import Products from "./components/Products.tsx";
import Users from "./components/Users.tsx";
import { TakeHomeDataProvider } from "./contexts/TakeHomeData.tsx";

function App() {
  return (
    <>
      <Logo>🧮</Logo>
      <h1>take-home-table</h1>

      <h2>Products</h2>
      <hr />
      <TakeHomeDataProvider resource="products">
        <Products />
      </TakeHomeDataProvider>

      <h2>Users</h2>
      <hr />
      <TakeHomeDataProvider resource="users">
        <Users />
      </TakeHomeDataProvider>
    </>
  );
}

const Logo = styled.div`
  will-change: filter;
  transition: filter 300ms;
  font-size: 96px;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

export default App;
