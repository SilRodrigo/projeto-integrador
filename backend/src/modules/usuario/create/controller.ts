import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUsuario } from '../../../core/entities/usuario';
import { IUsuarioCreateUseCase } from './useCase';

interface IFactoryParams {
    usuarioCreateUseCase: IUsuarioCreateUseCase;
}

export interface IUsuarioCreateController extends IController<IUsuario> { }

export default function usuarioCreateControllerFactory({
    usuarioCreateUseCase
}: IFactoryParams): IUsuarioCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { nome, senha } = request.body;

            try {
                const { data, message } = await usuarioCreateUseCase.execute({ nome, senha });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}