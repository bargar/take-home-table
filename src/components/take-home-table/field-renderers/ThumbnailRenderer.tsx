import styled from "styled-components";
import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

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
`;

export default ThumbnailRenderer;
