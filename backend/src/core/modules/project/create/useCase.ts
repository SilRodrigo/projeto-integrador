import { IProject } from "../../../entities/project";
import { ICreateProjectDto, IFilterProjectDto } from "../../../dtos/project";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaProjectRepository } from "../../../repositories";

interface IFactoryParams {
    prismaProjectRepository: PrismaProjectRepository;
}

export interface IProjectCreateUseCase extends IUseCase<ICreateProjectDto, IProject> { }

export default function projectCreateUseCaseFactory({
    prismaProjectRepository
}: IFactoryParams): IProjectCreateUseCase {
    return {
        execute: async (data) => {
            if (data.name) {
                const filter: IFilterProjectDto = { name: data.name, userId: data.userId };
                const result = await prismaProjectRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [projectExists] = result.items;

                if (projectExists) {
                    throw new Error("Project with this name already exists for this user.");
                }
            }

            const project = await prismaProjectRepository.create(data);

            return withUseCaseResponse(project, "Project created successfully.");
        }
    };
}
