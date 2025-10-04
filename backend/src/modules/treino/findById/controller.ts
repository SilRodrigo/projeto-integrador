import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITreino } from '../../../core/entities/treino';
import { ITreinoFindByIdUseCase } from './useCase';

interface IFactoryParams {
    treinoFindByIdUseCase: ITreinoFindByIdUseCase;
}

export interface ITreinoFindByIdController extends IController<ITreino> { }

export default function treinoFindByIdControllerFactory({
    treinoFindByIdUseCase
}: IFactoryParams): ITreinoFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;

                const { data, message } = await treinoFindByIdUseCase.execute(Number(id));

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}