import { IRequirementVersion } from "../../../entities/requirementVersion";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementVersionRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementVersionRepository: PrismaRequirementVersionRepository;
}

export interface IRequirementVersionFindByIdUseCase extends IUseCase<string, IRequirementVersion> { }

export default function requirementVersionFindByIdUseCaseFactory({
    prismaRequirementVersionRepository
}: IFactoryParams): IRequirementVersionFindByIdUseCase {
    return {
        execute: async (id) => {
            const version = await prismaRequirementVersionRepository.findById(id);

            if (!version) {
                throw new Error("Requirement version not found.");
            }

            return withUseCaseResponse(version, "Requirement version found successfully.");
        }
    };
}
