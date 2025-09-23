import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUser } from '../../../core/entities/user';
import { IUserCreateUseCase } from './useCase';

interface IFactoryParams {
    userCreateUseCase: IUserCreateUseCase;
}

export interface IUserCreateController extends IController<IUser> { }

export default function userCreateControllerFactory({
    userCreateUseCase
}: IFactoryParams): IUserCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { email, password } = request.body;

            try {
                const { data, message } = await userCreateUseCase.execute({ email, password });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}