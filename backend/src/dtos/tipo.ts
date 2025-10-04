import { Prisma } from "@prisma/client";

export interface ITipoCreateDto extends Prisma.TipoUncheckedCreateInput { }

export interface IRequestTipoDto extends Prisma.TipoGetPayload<{}> { }

export interface IUpdateTipoDto extends Prisma.TipoUpdateInput { }

export interface IFilterTipoDto extends Prisma.TipoWhereInput { }