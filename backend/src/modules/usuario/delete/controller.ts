import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IUsuarioDeleteUseCase } from './useCase';
import { IUsuario } from '../../../core/entities/usuario';

interface IFactoryParams {
    usuarioDeleteUseCase: IUsuarioDeleteUseCase;
}

export interface IUsuarioDeleteController extends IController<IUsuario> { }

export default function usuarioDeleteControllerFactory({
    usuarioDeleteUseCase
}: IFactoryParams): IUsuarioDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                await usuarioDeleteUseCase.execute(Number(id));

                return successResponse(response, null, 'Usuário excluído com sucesso.', 204);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}