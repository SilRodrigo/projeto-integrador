import { IUsuarioAuthDto } from "../../../dtos/usuario";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUsuarioRepository } from "../../../repositories";
import jwt from "jsonwebtoken";

interface IFactoryParams {
    prismaUsuarioRepository: PrismaUsuarioRepository;
}

interface IUsuarioAuthResponse {
    id: number;
    accessToken: string;
}

export interface IUsuarioAuthUseCase extends IUseCase<IUsuarioAuthDto, IUsuarioAuthResponse> { }

export default function usuarioAuthUseCaseFactory({
    prismaUsuarioRepository
}: IFactoryParams): IUsuarioAuthUseCase {
    return {
        execute: async ({ nome, senha }) => {
            if (!nome || !senha) {
                throw new Error("Nome e senha são obrigatórios.");
            }

            const usuario = await prismaUsuarioRepository.auth({ nome, senha });

            if (!usuario) {
                throw new Error("Nome de usuário ou senha inválidos.");
            }

            const token = jwt.sign(
                { usuarioId: usuario.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1d' }
            );

            const response: IUsuarioAuthResponse = { id: usuario.id, accessToken: token };
            console.log(token);

            return withUseCaseResponse(response, "Usuário autenticado com sucesso.");
        }
    };
}