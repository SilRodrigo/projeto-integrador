import { IPessoa } from "../../../core/entities/pessoa";
import { IUpdatePessoaDto } from "../../../dtos/pessoa";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaPessoaRepository } from "../../../repositories";

interface IFactoryParams {
    prismaPessoaRepository: PrismaPessoaRepository;
}

interface IUpdatePessoaRequest {
    id: number;
    data: IUpdatePessoaDto;
}

export interface IPessoaUpdateUseCase extends IUseCase<IUpdatePessoaRequest, IPessoa> { }

export default function pessoaUpdateUseCaseFactory({
    prismaPessoaRepository
}: IFactoryParams): IPessoaUpdateUseCase {
    return {
        execute: async ({ id, data }) => {
            const pessoaExists = await prismaPessoaRepository.findById(id);

            if (!pessoaExists) {
                throw new Error("Pessoa não encontrada.");
            }

            if (data.email && data.email !== pessoaExists.email) {
                const filter = { email: data.email };
                const result = await prismaPessoaRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [emailExists] = result.items;

                if (emailExists) {
                    throw new Error("Email já está sendo usado por outra pessoa.");
                }
            }

            // @ts-ignore - BaseRepository tem uma inconsistência nos tipos de ID
            const pessoa = await prismaPessoaRepository.update(id, data);

            return withUseCaseResponse(pessoa, "Pessoa atualizada com sucesso.");
        }
    };
}