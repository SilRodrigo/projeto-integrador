import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { ITipo } from '../../../core/entities/tipo';
import { ITipoFindByIdUseCase } from './useCase';

interface IFactoryParams {
    tipoFindByIdUseCase: ITipoFindByIdUseCase;
}

export interface ITipoFindByIdController extends IController<ITipo> { }

export default function tipoFindByIdControllerFactory({
    tipoFindByIdUseCase
}: IFactoryParams): ITipoFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;

                const { data, message } = await tipoFindByIdUseCase.execute(Number(id));

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}