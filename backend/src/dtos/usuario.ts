import { Prisma } from "@prisma/client";

export interface IUsuarioCreateDto extends Pick<Prisma.UsuarioUncheckedCreateInput, 'nome' | 'senha'> { }

export interface IRequestUsuarioDto extends Omit<Prisma.UsuarioGetPayload<{}>, 'senha'> { }

export interface IUpdateUsuarioDto extends Prisma.UsuarioUpdateInput { }

export interface IFilterUsuarioDto extends Omit<Prisma.UsuarioWhereInput, 'senha'> { }

export interface IUsuarioAuthDto {
  nome: string;
  senha: string;
}