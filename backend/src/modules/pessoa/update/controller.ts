import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IPessoa } from '../../../core/entities/pessoa';
import { IPessoaUpdateUseCase } from './useCase';

interface IFactoryParams {
    pessoaUpdateUseCase: IPessoaUpdateUseCase;
}

export interface IPessoaUpdateController extends IController<IPessoa> { }

export default function pessoaUpdateControllerFactory({
    pessoaUpdateUseCase
}: IFactoryParams): IPessoaUpdateController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { id } = request.params;
                const { nome, email, telefone, dataNascimento } = request.body;

                const { data, message } = await pessoaUpdateUseCase.execute({
                    id: Number(id),
                    data: {
                        nome,
                        email,
                        telefone,
                        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined
                    }
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}