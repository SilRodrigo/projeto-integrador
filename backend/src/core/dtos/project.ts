import { Prisma } from "@prisma/client";
import { WithOptionalIncludes } from ".";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
    include: {
        requirements: boolean | { include: { versions: boolean } };
    };
}>;

export interface ICreateProjectDto extends Pick<Prisma.ProjectUncheckedCreateInput, 'name' | 'userId'> {
    description?: string;
}

export interface IRequestProjectDto extends WithOptionalIncludes<ProjectWithRelations, 'requirements'> { }

export interface IUpdateProjectDto {
    name?: string;
    description?: string;
}

export interface IFilterProjectDto extends Prisma.ProjectWhereInput { }

export interface IOrderProjectDto extends Prisma.ProjectOrderByWithRelationInput {}
