import { ITreino } from "../../../core/entities/treino";
import { IUpdateTreinoDto } from "../../../dtos/treino";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTreinoRepository } from "../../../repositories";

interface IFactoryParams {
    prismaTreinoRepository: PrismaTreinoRepository;
}

interface IUpdateTreinoRequest {
    id: number;
    data: IUpdateTreinoDto;
}

export interface ITreinoUpdateUseCase extends IUseCase<IUpdateTreinoRequest, ITreino> { }

export default function treinoUpdateUseCaseFactory({
    prismaTreinoRepository
}: IFactoryParams): ITreinoUpdateUseCase {
    return {
        execute: async ({ id, data }) => {
            const treinoExists = await prismaTreinoRepository.findById(id);

            if (!treinoExists) {
                throw new Error("Treino não encontrada.");
            }
            // @ts-ignore - BaseRepository tem uma inconsistência nos tipos de ID
            const treino = await prismaTreinoRepository.update(id, data);

            return withUseCaseResponse(treino, "Treino atualizada com sucesso.");
        }
    };
}