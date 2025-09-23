import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IPessoa } from '../../../core/entities/pessoa';
import { IPessoaCreateUseCase } from './useCase';

interface IFactoryParams {
    pessoaCreateUseCase: IPessoaCreateUseCase;
}

export interface IPessoaCreateController extends IController<IPessoa> { }

export default function pessoaCreateControllerFactory({
    pessoaCreateUseCase
}: IFactoryParams): IPessoaCreateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            const { nome, email, telefone, dataNascimento } = request.body;

            try {
                const { data, message } = await pessoaCreateUseCase.execute({ 
                    nome, 
                    email, 
                    telefone, 
                    dataNascimento: new Date(dataNascimento)
                });

                return successResponse(response, data, message, 201);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}