import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUsuarioAuthUseCase } from './useCase';
import { IUsuario } from '../../../core/entities/usuario';

interface IFactoryParams {
    usuarioAuthUseCase: IUsuarioAuthUseCase;
}

export interface IUsuarioAuthController extends IController<IUsuario> { }

export default function usuarioAuthControllerFactory({
    usuarioAuthUseCase
}: IFactoryParams): IUsuarioAuthController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { nome, senha } = request.body;

            if (!nome || !senha) {
                return errorResponse(response, new Error("Nome e senha são obrigatórios."));
            }

            try {
                const { data, message } = await usuarioAuthUseCase.execute({ nome, senha });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}