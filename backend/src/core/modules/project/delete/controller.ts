import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IProjectDeleteUseCase } from './useCase';

interface IFactoryParams {
    projectDeleteUseCase: IProjectDeleteUseCase;
}

export interface IProjectDeleteController extends IController<null> { }

export default function projectDeleteControllerFactory({
    projectDeleteUseCase
}: IFactoryParams): IProjectDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { message } = await projectDeleteUseCase.execute(id);

                return successResponse(response, null, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
