import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITreino } from '../../../core/entities/treino';
import { ITreinoUpdateUseCase } from './useCase';

interface IFactoryParams {
    treinoUpdateUseCase: ITreinoUpdateUseCase;
}

export interface ITreinoUpdateController extends IController<ITreino> { }

export default function treinoUpdateControllerFactory({
    treinoUpdateUseCase
}: IFactoryParams): ITreinoUpdateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;
                const { descricao, tipoId, dataHora } = request.body;

                const { data, message } = await treinoUpdateUseCase.execute({
                    id: Number(id),
                    data: {
                        descricao,
                        tipoId: Number(tipoId),
                        dataHora: dataHora ? new Date(dataHora) : undefined
                    }
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}