import products from "./products";
import users from "./users";
export type Resource = "products" | "users";
export type Identifiable = object & { id: string };
type Options = {
  page: number;
  pageSize: number;
  sortField?: string;
  sortAscending: boolean;
  filterField?: string;
  filterValue?: string;
};
const resources = {
  products,
  users,
};

export const mockFetch = async (resource: Resource, options: Options) => {
  const { page, pageSize, sortField, sortAscending, filterField, filterValue } =
    options;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const raw = resources[resource];
  if (!raw) {
    throw new Error(`unrecognized resource ${resource}`);
  }
  const filtered =
    filterField && filterValue ? filter(raw, filterField, filterValue) : raw;
  const total = filtered.length;
  const sorted = sortField
    ? sort(filtered, sortField, sortAscending)
    : filtered;
  const paginated = sorted.slice(start, end);
  return Promise.resolve({ total, data: paginated, resource });
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
