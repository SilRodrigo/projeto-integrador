import { ITipo } from "../../../core/entities/tipo";
import { IFilterTipoDto } from "../../../dtos/tipo";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTipoRepository } from "../../../repositories";
import { IPaginationResult } from "../../../core/helpers/pagination";

interface IFactoryParams {
    prismaTipoRepository: PrismaTipoRepository;
}

interface IListTipoRequest {
    currentPage: number;
    pageSize: number;
    filter?: IFilterTipoDto;
}

export interface ITipoListUseCase extends IUseCase<IListTipoRequest, IPaginationResult<ITipo>> { }

export default function tipoListUseCaseFactory({
    prismaTipoRepository
}: IFactoryParams): ITipoListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter }) => {
            const result = await prismaTipoRepository.findByFilter({
                currentPage,
                pageSize,
                filter
            });

            return withUseCaseResponse(result, "Tipos listadas com sucesso.");
        }
    };
}