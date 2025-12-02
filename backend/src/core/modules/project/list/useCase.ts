import { IProject } from "../../../entities/project";
import { IFilterProjectDto, IOrderProjectDto } from "../../../dtos/project";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaProjectRepository } from "../../../repositories";

interface IFactoryParams {
    prismaProjectRepository: PrismaProjectRepository;
}

export interface IProjectListUseCase extends IUseCase<{currentPage: number; pageSize: number; filter?: IFilterProjectDto; order?: IOrderProjectDto}, any> { }

export default function projectListUseCaseFactory({
    prismaProjectRepository
}: IFactoryParams): IProjectListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter, order }) => {
            const result = await prismaProjectRepository.findByFilter({
                currentPage,
                pageSize,
                filter,
                order
            });

            return withUseCaseResponse(result, "Projects listed successfully.");
        }
    };
}
