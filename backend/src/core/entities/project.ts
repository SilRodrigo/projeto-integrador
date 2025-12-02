import { IRequestProjectDto } from "../dtos";
import { IRequirement, requirementFactory } from "./requirement";

export interface IProject {
    id: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    requirements?: IRequirement[];
}

export const projectFactory = (requestProjectDto: IRequestProjectDto): IProject => {
    const project: IProject = {
        id: requestProjectDto.id,
        name: requestProjectDto.name,
        description: requestProjectDto.description,
        createdAt: requestProjectDto.createdAt,
        updatedAt: requestProjectDto.updatedAt,
        userId: requestProjectDto.userId,
    };

    if (requestProjectDto.requirements) {
        project.requirements = requestProjectDto.requirements.map(requirementDto => requirementFactory(requirementDto));
    }

    return project;
};
