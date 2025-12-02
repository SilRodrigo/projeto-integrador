export interface IPaginationQueryParams {
    page?: string | number;
    pageSize?: string | number;
    filter?: string;
    order?: string;
}

export interface IParsedListParams<T = any> {
    currentPage: number;
    pageSize: number;
    filter: T;
    order?: any;
}

export const parseListParams = <T = any>(
    queryParams: IPaginationQueryParams,
    defaultPageSize: number = 10
): IParsedListParams<T> => {
    const { page = 1, pageSize = defaultPageSize, filter = '{}', order = '{}' } = queryParams;

    let parsedFilter: T = {} as T;
    let parsedOrder: any = {};

    try {
        parsedFilter = typeof filter === 'string' ? JSON.parse(filter) : (filter as T);
    } catch (error) {
        console.error('Error parsing filter:', error);
        parsedFilter = {} as T;
    }

    try {
        parsedOrder = typeof order === 'string' ? JSON.parse(order) : order;
    } catch (error) {
        console.error('Error parsing order:', error);
        parsedOrder = {};
    }

    return {
        currentPage: Number(page),
        pageSize: Number(pageSize),
        filter: parsedFilter,
        order: parsedOrder
    };
};
