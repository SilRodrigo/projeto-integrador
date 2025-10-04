import { Prisma } from "@prisma/client";

type TreinoWithRelations = Prisma.TreinoGetPayload<{
  include: {
    tipo: true
  };
}>;

export interface ITreinoCreateDto extends Prisma.TreinoUncheckedCreateInput { }

export interface IRequestTreinoDto extends TreinoWithRelations { }

export interface IUpdateTreinoDto extends Prisma.TreinoUncheckedUpdateInput { }

export interface IFilterTreinoDto extends Prisma.TreinoWhereInput { }