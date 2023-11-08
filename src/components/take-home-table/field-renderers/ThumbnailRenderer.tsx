import styled from "styled-components";
import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

/**
 * Show an image inline, allowing it to be opened in a new window for greater detail.
 * @param value
 * @param item
 * @constructor
 */
const ThumbnailRenderer: TakeHomeRenderer = ({ value, item }) => {
  return (
    <a
      href={item.images?.[0] || value}
      title="Open Image in New Window"
      target="detailImage"
    >
      <Thumbnail src={value as string} alt="thumbnail" />
    </a>
  );
};

const Thumbnail = styled.img`
  height: 75px;
  max-width: 150px;
  width: 150px;
  object-fit: cover;
`;

export default ThumbnailRenderer;
