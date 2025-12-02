import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IUser } from '../../../entities/user';
import { IUserFindByIdUseCase } from './useCase';

interface IFactoryParams {
    userFindByIdUseCase: IUserFindByIdUseCase;
}

export interface IUserFindByIdController extends IController<IUser> { }

export default function userFindByIdControllerFactory({
    userFindByIdUseCase
}: IFactoryParams): IUserFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;

                const { data, message } = await userFindByIdUseCase.execute(id);

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
