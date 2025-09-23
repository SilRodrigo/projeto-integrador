import { IUser } from "../../../core/entities/user";
import { IUserCreateDto, IFilterUserDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUserRepository } from "../../../repositories";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

export interface IUserCreateUseCase extends IUseCase<IUserCreateDto, IUser> { }

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
                    throw new Error("Usuário já existe.");
                }
            }

            const user = await prismaUserRepository.create(data);

            return withUseCaseResponse(user, "Usuário criado com sucesso.");
        }
    };
}