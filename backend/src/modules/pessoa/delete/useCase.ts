import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaPessoaRepository } from "../../../repositories";

interface IFactoryParams {
    prismaPessoaRepository: PrismaPessoaRepository;
}

export interface IPessoaDeleteUseCase extends IUseCase<number, void> { }

export default function pessoaDeleteUseCaseFactory({
    prismaPessoaRepository
}: IFactoryParams): IPessoaDeleteUseCase {
    return {
        execute: async (id) => {
            const pessoaExists = await prismaPessoaRepository.findById(id);

            if (!pessoaExists) {
                throw new Error('Pessoa não encontrada.');
            }

            await prismaPessoaRepository.delete(id);

            return withUseCaseResponse(undefined, 'Pessoa excluída com sucesso.');
        }
    };
}