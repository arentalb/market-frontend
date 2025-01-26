export interface QueryParams {
  page: number;
  size: number;
  filters?: Record<string, string>;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

const isValidSortDir = (value: string): value is "asc" | "desc" =>
  value === "asc" || value === "desc";

export const buildQueryString = ({
  page,
  size,
  filters = {},
  sortBy,
  sortDir,
}: QueryParams): string => {
  const query = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query.append("filter", `${key}:like:${value}`);
    }
  });

  if (sortBy && sortDir && isValidSortDir(sortDir)) {
    query.append("sort", `${sortBy}:${sortDir}`);
  }

  return `?${query.toString()}`;
};
