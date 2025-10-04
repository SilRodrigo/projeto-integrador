import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITreinoDeleteUseCase } from './useCase';
import { ITreino } from '../../../core/entities/treino';

interface IFactoryParams {
    treinoDeleteUseCase: ITreinoDeleteUseCase;
}

export interface ITreinoDeleteController extends IController<ITreino> { }

export default function treinoDeleteControllerFactory({
    treinoDeleteUseCase
}: IFactoryParams): ITreinoDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                await treinoDeleteUseCase.execute(Number(id));

                return successResponse(response, null, 'Treino excluído com sucesso.', 204);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}