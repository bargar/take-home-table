import "./App.css";
import styled from "styled-components";
import Products from "./components/Products.tsx";
import Users from "./components/Users.tsx";
import { TakeHomeDataProvider } from "./components/take-home-table/TakeHomeDataContext.tsx";
import { ReactNode } from "react";

function App() {
  return (
    <>
      <Logo>🧮</Logo>
      <h1>take-home-table</h1>

      <Example title="Products">
        <TakeHomeDataProvider resource="products">
          <Products />
        </TakeHomeDataProvider>
      </Example>

      <Example title="Users">
        <TakeHomeDataProvider resource="users">
          <Users />
        </TakeHomeDataProvider>
      </Example>
    </>
  );
}

const Example = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Section>
      <h2>{title}</h2>
      <hr />
      {children}
    </Section>
  );
};

const Logo = styled.div`
  will-change: filter;
  transition: filter 300ms;
  font-size: 96px;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const Section = styled.section`
  margin-top: 6em;
`;

export default App;
