import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IAuthController } from '../../../../types/Controller';
import { IRequirement } from '../../../entities';
import { IRequirementCreateUseCase } from './useCase';

interface IFactoryParams {
    requirementCreateUseCase: IRequirementCreateUseCase;
}

export interface IRequirementCreateController extends IAuthController<IRequirement> { }

export default function requirementCreateControllerFactory({
    requirementCreateUseCase
}: IFactoryParams): IRequirementCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { title, description, priority, complexity, isRequired, projectId } = request.body;

            try {
                const { data, message } = await requirementCreateUseCase.execute({
                    title,
                    description,
                    priority,
                    complexity,
                    isRequired,
                    projectId
                });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
