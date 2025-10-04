import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITipo } from '../../../core/entities/tipo';
import { ITipoListUseCase } from './useCase';

interface IFactoryParams {
    tipoListUseCase: ITipoListUseCase;
}

export interface ITipoListController extends IController<ITipo> { }

export default function tipoListControllerFactory({
    tipoListUseCase
}: IFactoryParams): ITipoListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { page = 1, pageSize = 10, ...filter } = request.query;

                const { data, message } = await tipoListUseCase.execute({
                    currentPage: Number(page),
                    pageSize: Number(pageSize),
                    filter
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}