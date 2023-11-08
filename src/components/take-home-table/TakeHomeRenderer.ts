import { FunctionComponent, ReactNode } from "react";

/**
 * Component type for rendering a particular table cell / field value.
 */
export type TakeHomeRenderer = FunctionComponent<RendererProps>;

/**
 * The TakeHomeRenderer is provided three things in order to offer flexibility in rendering:
 *  * the field value
 *  * the entire item (e.g. for rendering based on multiple fields)
 *  * wrapped content (children)
 */
type RendererProps = {
  children: ReactNode;
  value: string | number;
  item: any;
};
