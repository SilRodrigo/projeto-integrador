import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUserDeleteUseCase } from './useCase';
import { IUser } from '../../../core/entities/user';

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
                await userDeleteUseCase.execute(id);

                return successResponse(response, null, 'Usuário excluído com sucesso.', 204);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}