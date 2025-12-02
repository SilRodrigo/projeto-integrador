import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementVersionRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementVersionRepository: PrismaRequirementVersionRepository;
}

export interface IRequirementVersionDeleteUseCase extends IUseCase<string, void> { }

export default function requirementVersionDeleteUseCaseFactory({
    prismaRequirementVersionRepository
}: IFactoryParams): IRequirementVersionDeleteUseCase {
    return {
        execute: async (id) => {
            const versionExists = await prismaRequirementVersionRepository.findById(id);

            if (!versionExists) {
                throw new Error("Requirement version not found.");
            }

            await prismaRequirementVersionRepository.delete(id);

            return withUseCaseResponse(null, "Requirement version deleted successfully.");
        }
    };
}
