import { ITreino } from "../../../core/entities/treino";
import { ITreinoCreateDto } from "../../../dtos";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTreinoRepository } from "../../../repositories";

interface IFactoryParams {
    prismaTreinoRepository: PrismaTreinoRepository;
}

export interface ITreinoCreateUseCase extends IUseCase<ITreinoCreateDto, ITreino> { }

export default function treinoCreateUseCaseFactory({
    prismaTreinoRepository
}: IFactoryParams): ITreinoCreateUseCase {
    return {
        execute: async (data) => {
            const treino = await prismaTreinoRepository.create({
                dataHora: data.dataHora,
                descricao: data.descricao,
                tipoId: data.tipoId
            });

            return withUseCaseResponse(treino, "Treino criado com sucesso.");
        }
    };
}