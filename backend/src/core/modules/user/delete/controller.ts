import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IUserDeleteUseCase } from './useCase';
import { IUser } from '../../../entities/user';

interface IFactoryParams {
    userDeleteUseCase: IUserDeleteUseCase;
}

export interface IUserDeleteController extends IController<IUser> { }

export default function userDeleteControllerFactory({
    userDeleteUseCase
}: IFactoryParams): IUserDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { data, message } = await userDeleteUseCase.execute(id);

                return successResponse(response, data, message, 200);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
