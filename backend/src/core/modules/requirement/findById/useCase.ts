import { IRequirement } from "../../../entities/requirement";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementRepository: PrismaRequirementRepository;
}

export interface IRequirementFindByIdUseCase extends IUseCase<string, IRequirement> { }

export default function requirementFindByIdUseCaseFactory({
    prismaRequirementRepository
}: IFactoryParams): IRequirementFindByIdUseCase {
    return {
        execute: async (id) => {
            const requirement = await prismaRequirementRepository.findById(id);

            if (!requirement) {
                throw new Error("Requirement not found.");
            }

            return withUseCaseResponse(requirement, "Requirement found successfully.");
        }
    };
}
