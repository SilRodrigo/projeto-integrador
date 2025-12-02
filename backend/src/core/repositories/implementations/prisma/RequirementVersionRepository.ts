import { IRequirementVersion, requirementVersionFactory } from "../../../entities/requirementVersion";
import { ICreateRequirementVersionDto, IRequestRequirementVersionDto, IUpdateRequirementVersionDto } from "../../../dtos";
import { PrismaBaseRepository } from "./abstract/BaseRepository";

const INDEX_KEY = 'requirementVersion' as const;

export default class PrismaRequirementVersionRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    {},
    IRequirementVersion,
    ICreateRequirementVersionDto,
    IRequestRequirementVersionDto,
    IUpdateRequirementVersionDto> {

    constructor() {
        super(INDEX_KEY, requirementVersionFactory, {})
    }
}
