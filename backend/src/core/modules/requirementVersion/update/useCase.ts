import { IRequirementVersion } from "../../../entities/requirementVersion";
import { IUpdateRequirementVersionDto } from "../../../dtos/requirementVersion";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementVersionRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementVersionRepository: PrismaRequirementVersionRepository;
}

export interface IRequirementVersionUpdateUseCase extends IUseCase<{id: string; data: IUpdateRequirementVersionDto}, IRequirementVersion> { }

export default function requirementVersionUpdateUseCaseFactory({
    prismaRequirementVersionRepository
}: IFactoryParams): IRequirementVersionUpdateUseCase {
    return {
        execute: async ({ id, data }) => {
            const versionExists = await prismaRequirementVersionRepository.findById(id);

            if (!versionExists) {
                throw new Error("Requirement version not found.");
            }

            const version = await prismaRequirementVersionRepository.update(id, data);

            return withUseCaseResponse(version, "Requirement version updated successfully.");
        }
    };
}
