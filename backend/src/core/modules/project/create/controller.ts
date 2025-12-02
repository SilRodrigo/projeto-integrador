import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IAuthController } from '../../../../types/Controller';
import { IProject } from '../../../entities/project';
import { IProjectCreateUseCase } from './useCase';

interface IFactoryParams {
    projectCreateUseCase: IProjectCreateUseCase;
}

export interface IProjectCreateController extends IAuthController<IProject> { }

export default function projectCreateControllerFactory({
    projectCreateUseCase
}: IFactoryParams): IProjectCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { name, description } = request.body;
            const userId = request.user?.id;

            try {
                if (!userId) {
                    return errorResponse(response, new Error("User not authenticated"));
                }

                const { data, message } = await projectCreateUseCase.execute({ 
                    name, 
                    description,
                    userId 
                });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
