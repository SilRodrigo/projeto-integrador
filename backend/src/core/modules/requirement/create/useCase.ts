import { IRequirement } from "../../../entities/requirement";
import { ICreateRequirementDto, IFilterRequirementDto } from "../../../dtos/requirement";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementRepository: PrismaRequirementRepository;
}

export interface IRequirementCreateUseCase extends IUseCase<ICreateRequirementDto, IRequirement> { }

export default function requirementCreateUseCaseFactory({
    prismaRequirementRepository
}: IFactoryParams): IRequirementCreateUseCase {
    return {
        execute: async (data) => {
            if (data.title) {
                const filter: IFilterRequirementDto = { title: data.title };
                const result = await prismaRequirementRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [requirementExists] = result.items;

                if (requirementExists) {
                    throw new Error("Requirement with this title already exists for this project.");
                }
            }

            const requirement = await prismaRequirementRepository.create(data);

            return withUseCaseResponse(requirement, "Requirement created successfully.");
        }
    };
}
