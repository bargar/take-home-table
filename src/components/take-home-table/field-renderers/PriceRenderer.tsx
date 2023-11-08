import { TakeHomeRenderer } from "../TakeHomeRenderer.ts";

const formatPrice = (price: string | number) => `$${price}`;
const PriceRenderer: TakeHomeRenderer = ({ value }) => formatPrice(value);
export default PriceRenderer;
