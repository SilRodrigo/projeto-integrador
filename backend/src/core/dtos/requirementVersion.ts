import { Prisma } from "@prisma/client";

export interface ICreateRequirementVersionDto extends Pick<Prisma.RequirementVersionUncheckedCreateInput, 'versionNumber' | 'requirementId'> {
    description?: string;
}

export interface IRequestRequirementVersionDto extends Prisma.RequirementVersionGetPayload<{}> { }

export interface IUpdateRequirementVersionDto {
    versionNumber?: string;
    description?: string;
}

export interface IFilterRequirementVersionDto extends Prisma.RequirementVersionWhereInput { }

export interface IOrderRequirementVersionDto extends Prisma.RequirementVersionOrderByWithRelationInput {}