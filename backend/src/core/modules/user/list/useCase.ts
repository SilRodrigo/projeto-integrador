import { IUser } from '../../../entities/user';
import { IFilterUserDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaUserRepository } from "../../../repositories";
import { IPaginationResult } from "../../../../helpers/pagination";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

interface IListUserRequest {
    currentPage: number;
    pageSize: number;
    filter?: IFilterUserDto;
    order?: any;
}

export interface IUserListUseCase extends IUseCase<IListUserRequest, IPaginationResult<IUser>> { }

export default function userListUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter, order }) => {
            const result = await prismaUserRepository.findByFilter({
                currentPage,
                pageSize,
                filter,
                order
            });

            return withUseCaseResponse(result, "Usuários listados com sucesso.");
        }
    };
}