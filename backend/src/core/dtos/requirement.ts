import { Prisma } from "@prisma/client";
import { WithOptionalIncludes } from ".";

export type RequirementWithRelations = Prisma.RequirementGetPayload<{
  include: {
    versions: boolean;
  };
}>;

export interface ICreateRequirementDto extends Pick<Prisma.RequirementUncheckedCreateInput, 'title' | 'projectId'> {
    description?: string;
    priority?: string;
    complexity?: string;
    isRequired?: boolean;
}

export interface IRequestRequirementDto extends WithOptionalIncludes<RequirementWithRelations, 'versions'> {}

export interface IUpdateRequirementDto {
    title?: string;
    description?: string;
    priority?: string;
    complexity?: string;
    isRequired?: boolean;
}

export interface IFilterRequirementDto extends Prisma.RequirementWhereInput { }

export interface IOrderRequirementDto extends Prisma.RequirementOrderByWithRelationInput {}
