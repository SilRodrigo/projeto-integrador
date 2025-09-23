import { IUsuario } from "../../../core/entities/usuario";
import { IUsuarioCreateDto, IFilterUsuarioDto } from "../../../dtos/usuario";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUsuarioRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUsuarioRepository: PrismaUsuarioRepository;
}

export interface IUsuarioCreateUseCase extends IUseCase<IUsuarioCreateDto, IUsuario> { }

export default function usuarioCreateUseCaseFactory({
    prismaUsuarioRepository
}: IFactoryParams): IUsuarioCreateUseCase {
    return {
        execute: async (data) => {
            if (data.nome) {
                const filter: IFilterUsuarioDto = { nome: data.nome };
                const result = await prismaUsuarioRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [usuarioExists] = result.items;

                if (usuarioExists) {
                    throw new Error("Usuário já existe.");
                }
            }

            const usuario = await prismaUsuarioRepository.create(data);

            return withUseCaseResponse(usuario, "Usuário criado com sucesso.");
        }
    };
}