import { IRequirementVersion } from "../../../entities/requirementVersion";
import { ICreateRequirementVersionDto, IFilterRequirementVersionDto } from "../../../dtos/requirementVersion";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaRequirementVersionRepository } from "../../../repositories";

interface IFactoryParams {
    prismaRequirementVersionRepository: PrismaRequirementVersionRepository;
}

export interface IRequirementVersionCreateUseCase extends IUseCase<ICreateRequirementVersionDto, IRequirementVersion> { }

export default function requirementVersionCreateUseCaseFactory({
    prismaRequirementVersionRepository
}: IFactoryParams): IRequirementVersionCreateUseCase {
    return {
        execute: async (data) => {
            if (data.versionNumber) {
                const filter: IFilterRequirementVersionDto = { 
                    versionNumber: data.versionNumber, 
                    requirementId: data.requirementId 
                };
                const result = await prismaRequirementVersionRepository.findByFilter({ currentPage: 1, pageSize: 1, filter });
                const [versionExists] = result.items;

                if (versionExists) {
                    throw new Error("Version number already exists for this requirement.");
                }
            }

            const version = await prismaRequirementVersionRepository.create(data);

            return withUseCaseResponse(version, "Requirement version created successfully.");
        }
    };
}
