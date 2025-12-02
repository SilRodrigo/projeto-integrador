import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IAuthController } from '../../../../types/Controller';
import { IRequirementVersionUpdateUseCase } from './useCase';
import { IRequirementVersion } from '../../../entities';

interface IFactoryParams {
    requirementVersionUpdateUseCase: IRequirementVersionUpdateUseCase;
}

export interface IRequirementVersionUpdateController extends IAuthController<IRequirementVersion> { }

export default function requirementVersionUpdateControllerFactory({
    requirementVersionUpdateUseCase
}: IFactoryParams): IRequirementVersionUpdateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;
            const { versionNumber, description } = request.body;

            try {
                const { data, message } = await requirementVersionUpdateUseCase.execute({
                    id,
                    data: { versionNumber, description }
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
