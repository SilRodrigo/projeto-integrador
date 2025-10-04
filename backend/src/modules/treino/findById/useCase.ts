import { ITreino } from "../../../core/entities/treino";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTreinoRepository } from "../../../repositories";

interface IFactoryParams {
    prismaTreinoRepository: PrismaTreinoRepository;
}

export interface ITreinoFindByIdUseCase extends IUseCase<number, ITreino> { }

export default function treinoFindByIdUseCaseFactory({
    prismaTreinoRepository
}: IFactoryParams): ITreinoFindByIdUseCase {
    return {
        execute: async (id) => {
            const treino = await prismaTreinoRepository.findById(id);

            if (!treino) {
                throw new Error("Treino não existe.");
            }

            return withUseCaseResponse(treino, "Treino encontrado com sucesso.");
        }
    };
}