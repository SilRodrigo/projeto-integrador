import { ITreino } from "../../../core/entities/treino";
import { IFilterTreinoDto } from "../../../dtos/treino";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTreinoRepository } from "../../../repositories";
import { IPaginationResult } from "../../../core/helpers/pagination";

interface IFactoryParams {
    prismaTreinoRepository: PrismaTreinoRepository;
}

interface IListTreinoRequest {
    currentPage: number;
    pageSize: number;
    filter?: IFilterTreinoDto;
}

export interface ITreinoListUseCase extends IUseCase<IListTreinoRequest, IPaginationResult<ITreino>> { }

export default function treinoListUseCaseFactory({
    prismaTreinoRepository
}: IFactoryParams): ITreinoListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter }) => {
            const result = await prismaTreinoRepository.findByFilter({
                currentPage,
                pageSize,
                filter
            });

            return withUseCaseResponse(result, "Treinos listadas com sucesso.");
        }
    };
}