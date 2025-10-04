export type WithOptionalIncludes<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export { IUsuarioCreateDto, IRequestUsuarioDto, IUpdateUsuarioDto, IFilterUsuarioDto, IUsuarioAuthDto } from './usuario'
export { ITipoCreateDto, IRequestTipoDto, IUpdateTipoDto, IFilterTipoDto } from './tipo'
export { ITreinoCreateDto, IRequestTreinoDto, IUpdateTreinoDto, IFilterTreinoDto } from './treino'