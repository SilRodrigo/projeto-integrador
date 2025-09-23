import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUserAuthUseCase } from './useCase';
import { IUser } from '../../../core/entities/user';

interface IFactoryParams {
    userAuthUseCase: IUserAuthUseCase;
}

export interface IUserAuthController extends IController<IUser> { }

export default function userAuthControllerFactory({
    userAuthUseCase
}: IFactoryParams): IUserAuthController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { email, password } = request.body;

            if (!email || !password) {
                return errorResponse(response, new Error("Email e password são obrigatórios."));
            }

            try {
                const { data, message } = await userAuthUseCase.execute({ email, password });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}