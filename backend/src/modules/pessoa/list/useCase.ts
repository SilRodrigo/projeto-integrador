import { IPessoa } from "../../../core/entities/pessoa";
import { IFilterPessoaDto } from "../../../dtos/pessoa";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaPessoaRepository } from "../../../repositories";
import { IPaginationResult } from "../../../core/helpers/pagination";

interface IFactoryParams {
    prismaPessoaRepository: PrismaPessoaRepository;
}

interface IListPessoaRequest {
    currentPage: number;
    pageSize: number;
    filter?: IFilterPessoaDto;
}

export interface IPessoaListUseCase extends IUseCase<IListPessoaRequest, IPaginationResult<IPessoa>> { }

export default function pessoaListUseCaseFactory({
    prismaPessoaRepository
}: IFactoryParams): IPessoaListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter }) => {
            const result = await prismaPessoaRepository.findByFilter({
                currentPage,
                pageSize,
                filter
            });

            return withUseCaseResponse(result, "Pessoas listadas com sucesso.");
        }
    };
}