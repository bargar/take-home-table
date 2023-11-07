import products from "./products";
type Resource = "products";
type Options = {
  page: number;
  pageSize: number;
  sortField?: string;
  sortAscending: boolean;
};
export const mockFetch = async (resource: Resource, options: Options) => {
  if (resource !== "products") {
    throw new Error(`unrecognized resource ${resource}`);
  }
  const { page, pageSize, sortField, sortAscending } = options;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const total = products.length;
  const sorted = sortField
    ? sort(products, sortField, sortAscending)
    : products;
  const paginated = sorted.slice(start, end);
  return Promise.resolve({ total, data: paginated });
};

const sort = (data: any[], field: string, ascending: boolean) =>
  data.slice().sort((a, b) => {
    if (a[field] > b[field]) {
      return ascending ? 1 : -1;
    }
    if (a[field] < b[field]) {
      return ascending ? -1 : 1;
    }
    return 0;
  });

export const PAGE_SIZES = [5, 10, 50, 100];
