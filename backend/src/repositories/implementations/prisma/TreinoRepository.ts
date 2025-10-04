import { ITreinoCreateDto, IRequestTreinoDto, IUpdateTreinoDto } from "../../../dtos";
import { PrismaBaseRepository } from "./abstract/BaseRepository";
import { ITreino, treinoFactory } from "../../../core/entities/treino";
import { Prisma } from "@prisma/client";

const INDEX_KEY = 'treino' as const;

export default class PrismaTreinoRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    Prisma.TreinoInclude,
    ITreino,
    ITreinoCreateDto,
    IRequestTreinoDto,
    IUpdateTreinoDto> {

    constructor() {
        const include = {
            tipo: true
        };

        super(INDEX_KEY, treinoFactory, include);
    }
}