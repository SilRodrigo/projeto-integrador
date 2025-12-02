import { IProject } from "../../../entities/project";
import { IUpdateProjectDto } from "../../../dtos/project";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaProjectRepository } from "../../../repositories";

interface IFactoryParams {
    prismaProjectRepository: PrismaProjectRepository;
}

export interface IProjectUpdateUseCase extends IUseCase<{id: string; data: IUpdateProjectDto}, IProject> { }

export default function projectUpdateUseCaseFactory({
    prismaProjectRepository
}: IFactoryParams): IProjectUpdateUseCase {
    return {
        execute: async ({ id, data }) => {
            const projectExists = await prismaProjectRepository.findById(id);

            if (!projectExists) {
                throw new Error("Project not found.");
            }

            const project = await prismaProjectRepository.update(id, data);

            return withUseCaseResponse(project, "Project updated successfully.");
        }
    };
}
