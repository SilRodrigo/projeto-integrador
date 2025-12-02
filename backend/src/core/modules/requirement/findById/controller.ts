import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IRequirementFindByIdUseCase } from './useCase';
import { IRequirement } from '../../../entities';

interface IFactoryParams {
    requirementFindByIdUseCase: IRequirementFindByIdUseCase;
}

export interface IRequirementFindByIdController extends IController<IRequirement> { }

export default function requirementFindByIdControllerFactory({
    requirementFindByIdUseCase
}: IFactoryParams): IRequirementFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { data, message } = await requirementFindByIdUseCase.execute(id);

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
