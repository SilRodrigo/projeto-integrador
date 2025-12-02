import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { parseListParams } from '../../../../helpers/parseListParams';
import { IController } from '../../../../types/Controller';
import { IProjectListUseCase } from './useCase';
import { IProject } from '../../../entities';

interface IFactoryParams {
    projectListUseCase: IProjectListUseCase;
}

export interface IProjectListController extends IController<IProject> { }

export default function projectListControllerFactory({
    projectListUseCase
}: IFactoryParams): IProjectListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { currentPage, pageSize, filter, order } = parseListParams(request.query);

                const { data, message } = await projectListUseCase.execute({
                    currentPage,
                    pageSize,
                    filter,
                    order
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
