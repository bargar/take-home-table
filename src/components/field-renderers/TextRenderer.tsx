import { TakeHomeRenderer } from "../TakeHomeTable.tsx";
import styled from "styled-components";

const TextRenderer: TakeHomeRenderer = ({ value }) => {
  return <EllipsisCell title={value as string}>{value}</EllipsisCell>;
};

const EllipsisCell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;
`;

export default TextRenderer;
