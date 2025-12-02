import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { parseListParams } from '../../../../helpers/parseListParams';
import { IController } from '../../../../types/Controller';
import { IRequirementListUseCase } from './useCase';
import { IRequirement } from '../../../entities';

interface IFactoryParams {
    requirementListUseCase: IRequirementListUseCase;
}

export interface IRequirementListController extends IController<IRequirement> { }

export default function requirementListControllerFactory({
    requirementListUseCase
}: IFactoryParams): IRequirementListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { projectId } = request.params;

                if (!projectId) {
                    return errorResponse(response, new Error("Project ID is required"));
                }

                const { currentPage, pageSize, filter, order } = parseListParams(request.query);

                const { data, message } = await requirementListUseCase.execute({
                    currentPage,
                    pageSize,
                    filter: {
                        ...filter,
                        projectId: String(projectId)
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
