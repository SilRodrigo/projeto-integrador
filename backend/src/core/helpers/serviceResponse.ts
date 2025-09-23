export interface IServiceResponse<T> {
  data: T | null;
  errorMessage: string;
  error: boolean;
}

export const withServiceResponse = <T, U>(
  fn: (params: T) => Promise<U>
) => {
  return async (params: T): Promise<IServiceResponse<U>> => {
    try {
      const data = await fn(params);
      return { data, errorMessage: '', error: false };
    } catch (error: any) {
      return { data: null, errorMessage: error?.message || 'Unexpected error', error: true };
    }
  };
};