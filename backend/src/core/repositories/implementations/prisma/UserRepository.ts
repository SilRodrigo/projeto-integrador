import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { IUser, userFactory } from "../../../entities/user";
import { IUserCreateDto, IUpdateUserDto, IRequestUserDto, IUserAuthDto } from "../../../dtos";
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

    async create(data: IUserCreateDto, $transaction?: PrismaClient): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newData = { ...data, password: hashedPassword };

        return super.create(newData, $transaction);
    }

    async update(id: string, data: IUpdateUserDto, $transaction?: PrismaClient): Promise<IUser> {
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data = { ...data, password: hashedPassword };
        }

        return super.update(id, data, $transaction);
    }

    async auth({ email, password }: IUserAuthDto): Promise<IUser | null> {
        const entity = await this.repository.findUnique({ where: { email } });
        if (!entity) return null;

        const match = await bcrypt.compare(password, entity.password);
        if (!match) return null;

        return this.instance(entity);
    }
}