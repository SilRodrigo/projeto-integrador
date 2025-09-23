import { resultPaginated } from "../../../../core/helpers";
import { IPaginationResult } from "../../../../core/helpers/pagination";
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../../../libs";

export abstract class PrismaBaseRepository<T extends keyof typeof prismaClient, I, E, C, R, U> {

    private index: keyof typeof prismaClient;
    private include: I;

    protected repository?: any
    protected modelFactory: (data: R) => E;

    constructor(index: T, modelFactory: (data: R) => E, include: I) {
        this.index = index;
        this.repository = prismaClient[index];
        this.modelFactory = modelFactory;
        this.include = include;
    }

    protected instance(data: R): E {
        return this.modelFactory(data);
    }

    async create(data: C, $transaction?: PrismaClient): Promise<E> {
        const repository = $transaction?.[this.index] || this.repository;
        const entity = await repository.create({
            data
        });

        return this.instance(entity);
    }

    async update(id: string, data: U, $transaction?: PrismaClient): Promise<E> {
        const repository = $transaction?.[this.index] || this.repository;
        const entity = await repository.update({
            data,
            where: { id }
        });

        return this.instance(entity);
    }

    async delete(id: string, $transaction?: PrismaClient): Promise<void> {
        const repository = $transaction?.[this.index] || this.repository;
        await repository.delete({
            where: { id }
        });
    }

    async findByUnique(where: object, include?: I | false, $transaction?: PrismaClient): Promise<E | null> {
        const repository = $transaction?.[this.index] || this.repository;

        const queryOptions: any = { where };
        if (include !== false) {
            queryOptions.include = {
                ...this.include,
                ...include
            };
        }

        const entity = await repository.findUnique(queryOptions);

        return entity ? this.instance(entity) : null;
    }

    async findById(id: string, include?: I | false, $transaction?: PrismaClient): Promise<E | null> {
        if (!id) return null;

        return this.findByUnique({ id }, include, $transaction);
    }

    async findByFilter<T>(
        { currentPage, pageSize, filter, include }: { currentPage: number, pageSize: number, filter: T, include?: I | false },
        $transaction?: PrismaClient
    ): Promise<IPaginationResult<E>> {
        const repository = $transaction?.[this.index] || this.repository;

        const queryOptions: any = { where: filter };
        if (include !== false) {
            queryOptions.include = {
                ...this.include,
                ...include
            }
        }

        let items = await repository.findMany(queryOptions);

        items = items.map((item: any) => this.instance(item));

        return resultPaginated({ items, currentPage, pageSize, totalCount: items.length });
    }
}