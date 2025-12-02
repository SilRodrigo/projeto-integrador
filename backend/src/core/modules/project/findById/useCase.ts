import { IProject } from "../../../entities/project";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaProjectRepository } from "../../../repositories";

interface IFactoryParams {
    prismaProjectRepository: PrismaProjectRepository;
}

export interface IProjectFindByIdUseCase extends IUseCase<string, IProject> { }

export default function projectFindByIdUseCaseFactory({
    prismaProjectRepository
}: IFactoryParams): IProjectFindByIdUseCase {
    return {
        execute: async (id) => {
            const project = await prismaProjectRepository.findById(id);

            if (!project) {
                throw new Error("Project not found.");
            }

            return withUseCaseResponse(project, "Project found successfully.");
        }
    };
}
