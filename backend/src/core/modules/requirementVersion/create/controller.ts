import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IAuthController } from '../../../../types/Controller';
import { IRequirementVersion } from '../../../entities';
import { IRequirementVersionCreateUseCase } from './useCase';

interface IFactoryParams {
    requirementVersionCreateUseCase: IRequirementVersionCreateUseCase;
}

export interface IRequirementVersionCreateController extends IAuthController<IRequirementVersion> { }

export default function requirementVersionCreateControllerFactory({
    requirementVersionCreateUseCase
}: IFactoryParams): IRequirementVersionCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { versionNumber, description, requirementId } = request.body;

            try {
                const { data, message } = await requirementVersionCreateUseCase.execute({
                    versionNumber,
                    description,
                    requirementId
                });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
