import { IUsuario } from "../../../core/entities/usuario";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUsuarioRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUsuarioRepository: PrismaUsuarioRepository;
}

export interface IUsuarioFindByIdUseCase extends IUseCase<number, IUsuario> { }

export default function usuarioFindByIdUseCaseFactory({
    prismaUsuarioRepository
}: IFactoryParams): IUsuarioFindByIdUseCase {
    return {
        execute: async (id) => {
            const usuario = await prismaUsuarioRepository.findById(id);

            if (!usuario) {
                throw new Error("Usuário não existe.");
            }

            return withUseCaseResponse(usuario, "Usuário encontrado com sucesso.");
        }
    };
}