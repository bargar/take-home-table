import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

const MAX_STARS = 5;

/**
 * Given a float rating between 0 and MAX_STARS, show MAX_STARS star icons with the appropriate discrete number filled in
 * to express rating.
 * @param value
 * @constructor
 */
const RatingRenderer: TakeHomeRenderer = ({ value }) => {
  const starCount = Math.round(value as number);
  const stars = "".padEnd(starCount, "★").padEnd(MAX_STARS, "☆");
  return <div title={`${value} out of ${MAX_STARS}`}>{stars}</div>;
};

export default RatingRenderer;
