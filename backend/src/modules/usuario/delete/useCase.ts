import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUsuarioRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUsuarioRepository: PrismaUsuarioRepository;
}

export interface IUsuarioDeleteUseCase extends IUseCase<number, void> { }

export default function usuarioDeleteUseCaseFactory({
    prismaUsuarioRepository
}: IFactoryParams): IUsuarioDeleteUseCase {
    return {
        execute: async (id) => {
            const usuarioExists = await prismaUsuarioRepository.findById(id);

            if (!usuarioExists) {
                throw new Error('Usuário não existe.');
            }

            await prismaUsuarioRepository.delete(id);

            return withUseCaseResponse(undefined, 'Usuário excluído com sucesso.');
        }
    };
}