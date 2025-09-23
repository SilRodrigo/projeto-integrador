import { PrismaClient } from "@prisma/client";
import { IUsuario, usuarioFactory } from "../../../core/entities/usuario";
import { IUsuarioCreateDto, IUpdateUsuarioDto } from "../../../dtos";
import { IUsuarioAuthDto, IRequestUsuarioDto } from "../../../dtos/usuario";
import { PrismaBaseRepository } from "./abstract/BaseRepository";

const INDEX_KEY = 'usuario' as const;

export default class PrismaUsuarioRepository extends PrismaBaseRepository<
    typeof INDEX_KEY,
    {},
    IUsuario,
    IUsuarioCreateDto,
    IRequestUsuarioDto,
    IUpdateUsuarioDto> {

    constructor() {
        super(INDEX_KEY, usuarioFactory, {})
    }

    async auth({ nome, senha }: IUsuarioAuthDto): Promise<IUsuario | null> {
        const prismaClient = new PrismaClient()
        const [entity] = await prismaClient.$queryRaw<IUsuario[]>`
        SELECT *
        FROM "Usuario"
        WHERE nome = ${nome} AND senha = ${senha}
        LIMIT 1
    `;

        return entity ? this.instance(entity) : null;
    }
}