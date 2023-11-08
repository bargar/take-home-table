import { TakeHomeRenderer } from "../TakeHomeTable.tsx";
import styled from "styled-components";

const ThumbnailRenderer: TakeHomeRenderer = ({ value, item }) => {
  return (
    <a
      href={item.images[0]}
      title="Open Image in New Window"
      target="detailImage"
    >
      <Thumbnail src={value as string} alt="thumbnail" />
    </a>
  );
};

const Thumbnail = styled.img`
  //width: 100px;
  height: 75px;
`;

export default ThumbnailRenderer;
