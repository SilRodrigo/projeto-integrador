import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IProjectFindByIdUseCase } from './useCase';
import { IProject } from '../../../entities';

interface IFactoryParams {
    projectFindByIdUseCase: IProjectFindByIdUseCase;
}

export interface IProjectFindByIdController extends IController<IProject> { }

export default function projectFindByIdControllerFactory({
    projectFindByIdUseCase
}: IFactoryParams): IProjectFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { data, message } = await projectFindByIdUseCase.execute(id);

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
