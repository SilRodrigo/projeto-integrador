import { IPessoa } from "../../../core/entities/pessoa";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaPessoaRepository } from "../../../repositories";

interface IFactoryParams {
    prismaPessoaRepository: PrismaPessoaRepository;
}

export interface IPessoaFindByIdUseCase extends IUseCase<number, IPessoa> { }

export default function pessoaFindByIdUseCaseFactory({
    prismaPessoaRepository
}: IFactoryParams): IPessoaFindByIdUseCase {
    return {
        execute: async (id) => {
            const pessoa = await prismaPessoaRepository.findById(id);

            if (!pessoa) {
                throw new Error("Pessoa não encontrada.");
            }

            return withUseCaseResponse(pessoa, "Pessoa encontrada com sucesso.");
        }
    };
}