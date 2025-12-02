import { IUser } from "../../../entities/user";
import { ICreateUserDto, IFilterUserDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

export interface IUserCreateUseCase extends IUseCase<ICreateUserDto, IUser> { }

export default function userCreateUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserCreateUseCase {
    return {
        execute: async (data) => {
            if (data.email) {
                const filter: IFilterUserDto = { email: data.email };
                const result = await prismaUserRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [userExists] = result.items;

                if (userExists) {
                    throw new Error("User already exists.");
                }
            }

            const user = await prismaUserRepository.create(data);

            return withUseCaseResponse(user, "User created successfully.");
        }
    };
}
