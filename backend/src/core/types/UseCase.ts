export interface IUseCase<T, R> {
    execute(data: T): Promise<IUseCaseResponse<R>>
}

export interface IUseCaseResponse<T> {
    data: T | null,
    message: string,
    error: false | boolean
}

export const withUseCaseResponse = <T>(data: T | null, message = '', error = false) => ({ data, message, error });