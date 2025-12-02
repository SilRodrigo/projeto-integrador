import { IAuthUserDto } from "../../../dtos/user";
import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { PrismaUserRepository } from "../../../repositories";
import jwt from "jsonwebtoken";
import { IUser } from "../../../entities/user";

interface IFactoryParams {
    prismaUserRepository: PrismaUserRepository;
}

interface IUserAuthResponse {
    user: IUser;
    accessToken: string;
}

export interface IUserAuthUseCase extends IUseCase<IAuthUserDto, IUserAuthResponse> { }

export default function userAuthUseCaseFactory({
    prismaUserRepository
}: IFactoryParams): IUserAuthUseCase {
    return {
        execute: async ({ email, password }) => {
            if (!email || !password) {
                throw new Error("Email and password are required.");
            }

            const user = await prismaUserRepository.auth({ email, password });

            if (!user) {
                throw new Error("Invalid email or password.");
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1d' }
            );

            const response: IUserAuthResponse = { user, accessToken: token };

            return withUseCaseResponse(response, "User authenticated successfully.");
        }
    };
}
