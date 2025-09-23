import { IPessoa } from "../../../core/entities/pessoa";
import { IPessoaCreateDto } from "../../../dtos/pessoa";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaPessoaRepository } from "../../../repositories";

interface IFactoryParams {
    prismaPessoaRepository: PrismaPessoaRepository;
}

export interface IPessoaCreateUseCase extends IUseCase<IPessoaCreateDto, IPessoa> { }

export default function pessoaCreateUseCaseFactory({
    prismaPessoaRepository
}: IFactoryParams): IPessoaCreateUseCase {
    return {
        execute: async (data) => {
            if (data.email) {
                const filter = { email: data.email };
                const result = await prismaPessoaRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [pessoaExists] = result.items;

                if (pessoaExists) {
                    throw new Error("Pessoa já cadastrada com este email.");
                }
            }

            const pessoa = await prismaPessoaRepository.create(data);

            return withUseCaseResponse(pessoa, "Pessoa cadastrada com sucesso.");
        }
    };
}