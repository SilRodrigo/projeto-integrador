import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IRequirementDeleteUseCase } from './useCase';

interface IFactoryParams {
    requirementDeleteUseCase: IRequirementDeleteUseCase;
}

export interface IRequirementDeleteController extends IController<null> { }

export default function requirementDeleteControllerFactory({
    requirementDeleteUseCase
}: IFactoryParams): IRequirementDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { message } = await requirementDeleteUseCase.execute(id);

                return successResponse(response, null, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
