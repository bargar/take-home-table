import styled from "styled-components";
import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

/**
 * Component to render longer text, using ellipsis when too long and providing mouseover title.
 * @param value
 * @constructor
 */
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
