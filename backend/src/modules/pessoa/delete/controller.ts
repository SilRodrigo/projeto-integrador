import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IPessoa } from '../../../core/entities/pessoa';
import { IPessoaDeleteUseCase } from './useCase';

interface IFactoryParams {
    pessoaDeleteUseCase: IPessoaDeleteUseCase;
}

export interface IPessoaDeleteController extends IController<IPessoa> { }

export default function pessoaDeleteControllerFactory({
    pessoaDeleteUseCase
}: IFactoryParams): IPessoaDeleteController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { id } = request.params;

            try {
                await pessoaDeleteUseCase.execute(Number(id));

                return successResponse(response, null, 'Pessoa excluída com sucesso.', 204);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}