import { Prisma, PrismaClient } from "@prisma/client";
import { IRequirement, requirementFactory } from "../../../entities/requirement";
import { ICreateRequirementDto, IRequestRequirementDto, IUpdateRequirementDto } from "../../../dtos";
import { PrismaBaseRepository } from "./abstract/BaseRepository";

const INDEX_KEY = 'requirement' as const;

export default class PrismaRequirementRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    Prisma.RequirementInclude,
    IRequirement,
    ICreateRequirementDto,
    IRequestRequirementDto,
    IUpdateRequirementDto> {

    constructor() {
        const include = {
            versions: {
                orderBy: { createdAt: 'desc' as const }
            }
        }

        super(INDEX_KEY, requirementFactory, include)
    }
}
