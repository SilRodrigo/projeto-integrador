import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaProjectRepository } from "../../../repositories";

interface IFactoryParams {
    prismaProjectRepository: PrismaProjectRepository;
}

export interface IProjectDeleteUseCase extends IUseCase<string, void> { }

export default function projectDeleteUseCaseFactory({
    prismaProjectRepository
}: IFactoryParams): IProjectDeleteUseCase {
    return {
        execute: async (id) => {
            const projectExists = await prismaProjectRepository.findById(id);

            if (!projectExists) {
                throw new Error("Project not found.");
            }

            await prismaProjectRepository.delete(id);

            return withUseCaseResponse(null, "Project deleted successfully.");
        }
    };
}
