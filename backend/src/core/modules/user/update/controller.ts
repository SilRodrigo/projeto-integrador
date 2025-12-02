import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IUser } from '../../../entities/user';
import { IUserUpdateUseCase } from './useCase';

interface IFactoryParams {
    userUpdateUseCase: IUserUpdateUseCase;
}

export interface IUserUpdateController extends IController<IUser> { }

export default function userUpdateControllerFactory({
    userUpdateUseCase
}: IFactoryParams): IUserUpdateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;
                const { email, password } = request.body;

                const { data, message } = await userUpdateUseCase.execute({
                    id,
                    data: { email, password }
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
