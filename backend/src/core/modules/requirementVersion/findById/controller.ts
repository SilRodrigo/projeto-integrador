import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IRequirementVersionFindByIdUseCase } from './useCase';
import { IRequirementVersion } from '../../../entities';

interface IFactoryParams {
    requirementVersionFindByIdUseCase: IRequirementVersionFindByIdUseCase;
}

export interface IRequirementVersionFindByIdController extends IController<IRequirementVersion> { }

export default function requirementVersionFindByIdControllerFactory({
    requirementVersionFindByIdUseCase
}: IFactoryParams): IRequirementVersionFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                const { data, message } = await requirementVersionFindByIdUseCase.execute(id);

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
