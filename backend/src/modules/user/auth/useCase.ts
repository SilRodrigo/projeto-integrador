import { IUserAuthDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../core/types/UseCase";
import { PrismaUserRepository } from "../../../repositories";
import jwt from "jsonwebtoken";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

interface IUserAuthResponse {
    id: string;
    accessToken: string;
}

export interface IUserAuthUseCase extends IUseCase<IUserAuthDto, IUserAuthResponse> { }

export default function userAuthUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserAuthUseCase {
    return {
        execute: async ({ email, password }) => {
            if (!email || !password) {
                throw new Error("Nome e password são obrigatórios.");
            }

            const user = await prismaUserRepository.auth({ email: email, password: password });

            if (!user) {
                throw new Error("Nome de usuário ou password inválidos.");
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1d' }
            );

            const response: IUserAuthResponse = { id: user.id, accessToken: token };
            console.log(token);

            return withUseCaseResponse(response, "Usuário autenticado com sucesso.");
        }
    };
}