import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

export interface IUserDeleteUseCase extends IUseCase<string, {}> { }

export default function userDeleteUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserDeleteUseCase {
    return {
        execute: async (id) => {
            const userExists = await prismaUserRepository.findById(id);

            if (!userExists) {
                throw new Error('User does not exist.');
            }

            await prismaUserRepository.delete(id);

            return withUseCaseResponse({}, 'User deleted successfully.');
        }
    };
}
