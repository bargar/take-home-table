import "./App.css";
import styled from "styled-components";
import Products from "./components/Products.tsx";
import Users from "./components/Users.tsx";
import { TakeHomeDataProvider } from "./contexts/TakeHomeData.tsx";
import { Resource } from "./data/api.ts";

function App() {
  return (
    <>
      <Logo>🧮</Logo>
      <h1>take-home-table</h1>

      <Example resource="products" title="Products">
        <Products />
      </Example>

      <Example resource="users" title="Users">
        <Users />
      </Example>
    </>
  );
}

const Example = ({
  resource,
  title,
  children,
}: {
  resource: Resource;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Section>
      <h2>{title}</h2>
      <hr />
      <TakeHomeDataProvider resource={resource}>
        {children}
      </TakeHomeDataProvider>
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
