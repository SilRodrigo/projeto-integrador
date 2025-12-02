import { Prisma, PrismaClient } from "@prisma/client";
import { IProject, projectFactory } from "../../../entities/project";
import { ICreateProjectDto, IRequestProjectDto, IUpdateProjectDto } from "../../../dtos";
import { PrismaBaseRepository } from "./abstract/BaseRepository";

const INDEX_KEY = 'project' as const;

export default class PrismaProjectRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    Prisma.ProjectInclude,
    IProject,
    ICreateProjectDto,
    IRequestProjectDto,
    IUpdateProjectDto> {

    constructor() {
        const include = {
            requirements: true
        }

        super(INDEX_KEY, projectFactory, include)
    }
}
