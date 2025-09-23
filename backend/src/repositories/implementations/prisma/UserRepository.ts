import { IUser, userFactory } from "../../../core/entities/user";
import { IUserCreateDto, IUpdateUserDto } from "../../../dtos";
import { IUserAuthDto, IRequestUserDto } from "../../../dtos/user";
import { PrismaBaseRepository } from "./abstract/BaseRepository";

const INDEX_KEY = 'user' as const;

export default class PrismaUserRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    {},
    IUser,
    IUserCreateDto,
    IRequestUserDto,
    IUpdateUserDto> {

    constructor() {
        super(INDEX_KEY, userFactory, {})
    }

    async auth({ email, password }: IUserAuthDto): Promise<IUser | null> {
        return await this.findByUnique({ email, password });
    }
}