export type WithOptionalIncludes<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export { IPessoaCreateDto, IRequestPessoaDto, IUpdatePessoaDto, IFilterPessoaDto } from './pessoa'
export { IUsuarioCreateDto, IRequestUsuarioDto, IUpdateUsuarioDto, IFilterUsuarioDto, IUsuarioAuthDto } from './usuario'