import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IPessoa } from '../../../core/entities/pessoa';
import { IPessoaFindByIdUseCase } from './useCase';

interface IFactoryParams {
    pessoaFindByIdUseCase: IPessoaFindByIdUseCase;
}

export interface IPessoaFindByIdController extends IController<IPessoa> { }

export default function pessoaFindByIdControllerFactory({
    pessoaFindByIdUseCase
}: IFactoryParams): IPessoaFindByIdController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;

                const { data, message } = await pessoaFindByIdUseCase.execute(Number(id));

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}