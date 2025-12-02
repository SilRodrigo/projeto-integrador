import { IUser } from "../../../entities/user";
import { IFilterUserDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

export interface IUserFindByEmailUseCase extends IUseCase<string, IUser> { }

export default function userFindByEmailUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserFindByEmailUseCase {
    return {
        execute: async (email) => {
            const filter: IFilterUserDto = { email };
            const result = await prismaUserRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
            const [user] = result.items;

            if (!user) {
                throw new Error("User does not exist.");
            }

            return withUseCaseResponse(user, "User found successfully.");
        }
    };
}
