import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

const formatPrice = (price: string | number) => `$${price}`;

/**
 * Given a value, show it as a monetary price.
 *
 * @param value
 * @constructor
 */
const PriceRenderer: TakeHomeRenderer = ({ value }) => formatPrice(value);
export default PriceRenderer;
