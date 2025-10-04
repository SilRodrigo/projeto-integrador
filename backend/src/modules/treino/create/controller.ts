import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITreino } from '../../../core/entities/treino';
import { ITreinoCreateUseCase } from './useCase';

interface IFactoryParams {
    treinoCreateUseCase: ITreinoCreateUseCase;
}

export interface ITreinoCreateController extends IController<ITreino> { }

export default function treinoCreateControllerFactory({
    treinoCreateUseCase
}: IFactoryParams): ITreinoCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { dataHora, descricao, tipoId } = request.body;

            try {
                const { data, message } = await treinoCreateUseCase.execute({ 
                    dataHora: new Date(dataHora), 
                    descricao, 
                    tipoId: Number(tipoId) 
                });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}