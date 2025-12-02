import { IRequestRequirementVersionDto } from "../dtos";

export interface IRequirementVersion {
    id: string;
    versionNumber: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    requirementId: string;
}

export const requirementVersionFactory = (requestRequirementVersionDto: IRequestRequirementVersionDto): IRequirementVersion => {
    const requirementVersion = {
        id: requestRequirementVersionDto.id,
        versionNumber: requestRequirementVersionDto.versionNumber,
        description: requestRequirementVersionDto.description,
        createdAt: requestRequirementVersionDto.createdAt,
        updatedAt: requestRequirementVersionDto.updatedAt,
        requirementId: requestRequirementVersionDto.requirementId,
    };

    return requirementVersion;
};
