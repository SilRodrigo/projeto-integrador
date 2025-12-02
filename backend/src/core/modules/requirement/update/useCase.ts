import { IRequirement } from "../../../entities/requirement";
import { IUpdateRequirementDto } from "../../../dtos/requirement";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementRepository: PrismaRequirementRepository;
}

export interface IRequirementUpdateUseCase extends IUseCase<{id: string; data: IUpdateRequirementDto}, IRequirement> { }

export default function requirementUpdateUseCaseFactory({
    prismaRequirementRepository
}: IFactoryParams): IRequirementUpdateUseCase {
    return {
        execute: async ({ id, data }) => {
            const requirementExists = await prismaRequirementRepository.findById(id);

            if (!requirementExists) {
                throw new Error("Requirement not found.");
            }

            const requirement = await prismaRequirementRepository.update(id, data);

            return withUseCaseResponse(requirement, "Requirement updated successfully.");
        }
    };
}
