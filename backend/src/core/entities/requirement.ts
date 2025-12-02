import { $Enums } from "@prisma/client";
import { IRequestRequirementDto } from "../dtos";
import { IRequirementVersion, requirementVersionFactory } from "./requirementVersion";

export interface IRequirement {
    id: string;
    title: string;
    description?: string | null;
    priority: $Enums.Priority;
    complexity: $Enums.Complexity;
    isRequired: boolean;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
    versions?: IRequirementVersion[];
}

export const requirementFactory = (requestRequirementDto: IRequestRequirementDto): IRequirement => {
    const requirement: IRequirement = {
        id: requestRequirementDto.id,
        title: requestRequirementDto.title,
        description: requestRequirementDto.description,
        priority: requestRequirementDto.priority,
        complexity: requestRequirementDto.complexity,
        isRequired: requestRequirementDto.isRequired,
        createdAt: requestRequirementDto.createdAt,
        updatedAt: requestRequirementDto.updatedAt,
        projectId: requestRequirementDto.projectId,
    };

    if (requestRequirementDto.versions) {
        requirement.versions = requestRequirementDto.versions.map(versionDto => requirementVersionFactory(versionDto));
    }

    return requirement;
};
