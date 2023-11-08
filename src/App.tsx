import "./App.css";
import styled from "styled-components";
import Products from "./components/Products.tsx";
import { TakeHomeDataProvider } from "./contexts/TakeHomeData.tsx";

function App() {
  return (
    <>
      <Logo>🧮</Logo>
      <h1>take-home-table</h1>
      <TakeHomeDataProvider>
        <Products />
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
