import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

const RatingRenderer: TakeHomeRenderer = ({ value }) => {
  const maxStars = 5;
  const starCount = Math.round(value as number);
  const stars = "".padEnd(starCount, "★").padEnd(maxStars, "☆");
  return <div title={`${value} out of ${maxStars}`}>{stars}</div>;
};

export default RatingRenderer;
