export type WithOptionalIncludes<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export { IUserCreateDto, IRequestUserDto, IUpdateUserDto, IFilterUserDto, IUserAuthDto } from './user'