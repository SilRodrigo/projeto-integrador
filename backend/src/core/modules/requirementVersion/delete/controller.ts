import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IRequirementVersionDeleteUseCase } from './useCase';

interface IFactoryParams {
    requirementVersionDeleteUseCase: IRequirementVersionDeleteUseCase;
}

export interface IRequirementVersionDeleteController extends IController<null> { }

export default function requirementVersionDeleteControllerFactory({
    requirementVersionDeleteUseCase
}: IFactoryParams): IRequirementVersionDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { message } = await requirementVersionDeleteUseCase.execute(id);

                return successResponse(response, null, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
