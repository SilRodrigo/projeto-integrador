import { ITipoCreateDto, IRequestTipoDto, IUpdateTipoDto } from "../../../dtos";
import { PrismaBaseRepository } from "./abstract/BaseRepository";
import { ITipo, tipoFactory } from "../../../core/entities/tipo";

const INDEX_KEY = 'tipo' as const;

export default class PrismaTipoRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    {},
    ITipo,
    ITipoCreateDto,
    IRequestTipoDto,
    IUpdateTipoDto> {

    constructor() {
        super(INDEX_KEY, tipoFactory, {})
    }
}