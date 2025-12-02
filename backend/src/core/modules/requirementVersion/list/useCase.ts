import { IRequirementVersion } from "../../../entities/requirementVersion";
import { IFilterRequirementVersionDto, IOrderRequirementVersionDto } from "../../../dtos/requirementVersion";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementVersionRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementVersionRepository: PrismaRequirementVersionRepository;
}

export interface IRequirementVersionListUseCase extends IUseCase<{
    currentPage: number;
    pageSize: number;
    filter?: IFilterRequirementVersionDto;
    order?: IOrderRequirementVersionDto
}, any> { }

export default function requirementVersionListUseCaseFactory({
    prismaRequirementVersionRepository
}: IFactoryParams): IRequirementVersionListUseCase {
    return {
        execute: async ({ currentPage, pageSize, filter, order }) => {
            const result = await prismaRequirementVersionRepository.findByFilter({
                currentPage,
                pageSize,
                filter,
                order,
            });

            return withUseCaseResponse(result, "Requirement versions listed successfully.");
        }
    };
}
