import products from "./products";
type Resource = "products";
type Options = {
  page: number;
  pageSize: number;
};
export const mockFetch = async (resource: Resource, options: Options) => {
  if (resource !== "products") {
    throw new Error(`unrecognized resource ${resource}`);
  }
  const { page, pageSize } = options;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const total = products.length;
  const paginated = products.slice(start, end);
  return Promise.resolve({ total, data: paginated });
};

export const PAGE_SIZES = [5, 10, 50, 100];
