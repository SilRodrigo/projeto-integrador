import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITreino } from '../../../core/entities/treino';
import { ITreinoListUseCase } from './useCase';

interface IFactoryParams {
    treinoListUseCase: ITreinoListUseCase;
}

export interface ITreinoListController extends IController<ITreino> { }

export default function treinoListControllerFactory({
    treinoListUseCase
}: IFactoryParams): ITreinoListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { page = 1, pageSize = 10, ...filter } = request.query;

                const { data, message } = await treinoListUseCase.execute({
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