import { IRequirement } from "../../../entities/requirement";
import { IFilterRequirementDto, IOrderRequirementDto } from "../../../dtos/requirement";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementRepository: PrismaRequirementRepository;
}

export interface IRequirementListUseCase extends IUseCase<{currentPage: number; pageSize: number; filter?: IFilterRequirementDto; order?: IOrderRequirementDto}, any> { }

export default function requirementListUseCaseFactory({
    prismaRequirementRepository
}: IFactoryParams): IRequirementListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter, order }) => {
            const result = await prismaRequirementRepository.findByFilter({
                currentPage,
                pageSize,
                filter,
                order
            });

            return withUseCaseResponse(result, "Requirements listed successfully.");
        }
    };
}
