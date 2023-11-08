import products from "./products";
export type Resource = "products";
export type Identifiable = object & { id: string };
type Options = {
  page: number;
  pageSize: number;
  sortField?: string;
  sortAscending: boolean;
  filterField?: string;
  filterValue?: string;
};
export const mockFetch = async (resource: Resource, options: Options) => {
  if (resource !== "products") {
    throw new Error(`unrecognized resource ${resource}`);
  }
  const { page, pageSize, sortField, sortAscending, filterField, filterValue } =
    options;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const filtered =
    filterField && filterValue
      ? filter(products, filterField, filterValue)
      : products;
  const total = filtered.length;
  const sorted = sortField
    ? sort(filtered, sortField, sortAscending)
    : filtered;
  const paginated = sorted.slice(start, end);
  return Promise.resolve({ total, data: paginated });
};

const filter = (data: any[], field: string, value: string) =>
  data
    .slice()
    .filter((item) =>
      String(item[field]).toLowerCase().includes(value.toLowerCase()),
    );

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
