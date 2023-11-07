import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <>
      <Logo>🧮</Logo>
      <h1>take-home-table</h1>
      <div className="card">TODO</div>
    </>
  );
}

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
