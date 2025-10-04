import { ITipo } from "../../../core/entities/tipo";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaTipoRepository } from "../../../repositories";

interface IFactoryParams {
    prismaTipoRepository: PrismaTipoRepository;
}

export interface ITipoFindByIdUseCase extends IUseCase<number, ITipo> { }

export default function tipoFindByIdUseCaseFactory({
    prismaTipoRepository
}: IFactoryParams): ITipoFindByIdUseCase {
    return {
        execute: async (id) => {
            const tipo = await prismaTipoRepository.findById(id);

            if (!tipo) {
                throw new Error("Tipo não existe.");
            }

            return withUseCaseResponse(tipo, "Tipo encontrado com sucesso.");
        }
    };
}