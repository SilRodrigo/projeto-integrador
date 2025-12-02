import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementRepository: PrismaRequirementRepository;
}

export interface IRequirementDeleteUseCase extends IUseCase<string, void> { }

export default function requirementDeleteUseCaseFactory({
    prismaRequirementRepository
}: IFactoryParams): IRequirementDeleteUseCase {
    return {
        execute: async (id) => {
            const requirementExists = await prismaRequirementRepository.findById(id);

            if (!requirementExists) {
                throw new Error("Requirement not found.");
            }

            await prismaRequirementRepository.delete(id);

            return withUseCaseResponse(null, "Requirement deleted successfully.");
        }
    };
}
