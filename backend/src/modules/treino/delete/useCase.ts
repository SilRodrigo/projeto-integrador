import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTreinoRepository } from "../../../repositories";

interface IFactoryParams {
    prismaTreinoRepository: PrismaTreinoRepository;
}

export interface ITreinoDeleteUseCase extends IUseCase<number, void> { }

export default function treinoDeleteUseCaseFactory({
    prismaTreinoRepository
}: IFactoryParams): ITreinoDeleteUseCase {
    return {
        execute: async (id) => {
            const treinoExists = await prismaTreinoRepository.findById(id);

            if (!treinoExists) {
                throw new Error('Treino não existe.');
            }

            await prismaTreinoRepository.delete(id);

            return withUseCaseResponse(undefined, 'Treino excluído com sucesso.');
        }
    };
}