import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUsuario } from '../../../core/entities/usuario';
import { IUsuarioFindByIdUseCase } from './useCase';

interface IFactoryParams {
    usuarioFindByIdUseCase: IUsuarioFindByIdUseCase;
}

export interface IUsuarioFindByIdController extends IController<IUsuario> { }

export default function usuarioFindByIdControllerFactory({
    usuarioFindByIdUseCase
}: IFactoryParams): IUsuarioFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;

                const { data, message } = await usuarioFindByIdUseCase.execute(Number(id));

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}