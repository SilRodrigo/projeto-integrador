interface IPaginationParams<T> {
  items: T[]
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export interface IPaginationResult<T> {
  items: T[];
  startIndex: number;
  endIndex: number;
  totalPages: number;
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function resultPaginated<T>({
  items,
  currentPage,
  pageSize,
  totalCount,
}: IPaginationParams<T>): IPaginationResult<T> {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  return {
    items,
    startIndex,
    endIndex,
    totalPages,
    currentPage,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}