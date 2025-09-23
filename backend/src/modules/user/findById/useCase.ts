import { IUser } from "../../../core/entities/user";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

export interface IUserFindByIdUseCase extends IUseCase<string, IUser> { }

export default function userFindByIdUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserFindByIdUseCase {
    return {
        execute: async (id) => {
            const user = await prismaUserRepository.findById(id);

            if (!user) {
                throw new Error("Usuário não existe.");
            }

            return withUseCaseResponse(user, "Usuário encontrado com sucesso.");
        }
    };
}