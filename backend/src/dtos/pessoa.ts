import { Prisma } from "@prisma/client";

export interface IPessoaCreateDto extends Pick<Prisma.PessoaUncheckedCreateInput, 'nome' | 'email' | 'telefone' | 'dataNascimento'> { }

export interface IRequestPessoaDto extends Prisma.PessoaGetPayload<{}> { }

export interface IUpdatePessoaDto extends Prisma.PessoaUpdateInput { }

export interface IFilterPessoaDto extends Prisma.PessoaWhereInput { }