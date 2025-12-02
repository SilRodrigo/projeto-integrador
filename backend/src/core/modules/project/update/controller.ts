import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IAuthController } from '../../../../types/Controller';
import { IProjectUpdateUseCase } from './useCase';
import { IProject } from '../../../entities';

interface IFactoryParams {
    projectUpdateUseCase: IProjectUpdateUseCase;
}

export interface IProjectUpdateController extends IAuthController<IProject> { }

export default function projectUpdateControllerFactory({
    projectUpdateUseCase
}: IFactoryParams): IProjectUpdateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;
            const { name, description } = request.body;

            try {
                const { data, message } = await projectUpdateUseCase.execute({
                    id,
                    data: { name, description }
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
