import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { parseListParams } from '../../../../helpers/parseListParams';
import { IController } from '../../../../types/Controller';
import { IRequirementVersionListUseCase } from './useCase';
import { IRequirementVersion } from '../../../entities';

interface IFactoryParams {
    requirementVersionListUseCase: IRequirementVersionListUseCase;
}

export interface IRequirementVersionListController extends IController<IRequirementVersion> { }

export default function requirementVersionListControllerFactory({
    requirementVersionListUseCase
}: IFactoryParams): IRequirementVersionListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { requirementId } = request.params;

                if (!requirementId) {
                    return errorResponse(response, new Error("Requirement ID is required"));
                }

                const { currentPage, pageSize, filter, order } = parseListParams(request.query);

                const { data, message } = await requirementVersionListUseCase.execute({
                    currentPage,
                    pageSize,
                    filter: {
                        ...filter,
                        requirementId: String(requirementId)
                    },
                    order
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
