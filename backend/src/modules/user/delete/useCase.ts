import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

export interface IUserDeleteUseCase extends IUseCase<string, void> { }

export default function userDeleteUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserDeleteUseCase {
    return {
        execute: async (id) => {
            const userExists = await prismaUserRepository.findById(id);

            if (!userExists) {
                throw new Error('Usuário não existe.');
            }

            await prismaUserRepository.delete(id);

            return withUseCaseResponse(undefined, 'Usuário excluído com sucesso.');
        }
    };
}