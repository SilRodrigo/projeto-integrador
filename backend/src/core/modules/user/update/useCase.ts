import { IUser } from "../../../entities/user";
import { IUpdateUserDto, IFilterUserDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

interface IUpdateUserRequest {
    id: string;
    data: IUpdateUserDto;
}

export interface IUserUpdateUseCase extends IUseCase<IUpdateUserRequest, IUser> { }

export default function userUpdateUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserUpdateUseCase {
    return {
        execute: async ({ id, data }) => {
            const userExists = await prismaUserRepository.findById(id);

            if (!userExists) {
                throw new Error("User not found.");
            }

            if (data.email && data.email !== userExists.email) {
                const filter: IFilterUserDto = { email: data.email };
                const result = await prismaUserRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [emailExists] = result.items;

                if (emailExists) {
                    throw new Error("Email already in use.");
                }
            }

            const user = await prismaUserRepository.update(id, data);

            return withUseCaseResponse(user, "User updated successfully.");
        }
    };
}
