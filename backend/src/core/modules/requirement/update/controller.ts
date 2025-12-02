import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IAuthController } from '../../../../types/Controller';
import { IRequirementUpdateUseCase } from './useCase';
import { IRequirement } from '../../../entities';

interface IFactoryParams {
    requirementUpdateUseCase: IRequirementUpdateUseCase;
}

export interface IRequirementUpdateController extends IAuthController<IRequirement> { }

export default function requirementUpdateControllerFactory({
    requirementUpdateUseCase
}: IFactoryParams): IRequirementUpdateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;
            const { title, description, priority, complexity, isRequired } = request.body;

            try {
                const { data, message } = await requirementUpdateUseCase.execute({
                    id,
                    data: { title, description, priority, complexity, isRequired }
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
