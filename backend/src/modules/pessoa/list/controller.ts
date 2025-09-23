import { Response } from 'express';
import { errorResponse, successResponse } from '../../../core/helpers/response';
import { IController } from '../../../core/types/Controller';
import { IPessoa } from '../../../core/entities/pessoa';
import { IPessoaListUseCase } from './useCase';

interface IFactoryParams {
    pessoaListUseCase: IPessoaListUseCase;
}

export interface IPessoaListController extends IController<IPessoa> { }

export default function pessoaListControllerFactory({
    pessoaListUseCase
}: IFactoryParams): IPessoaListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { page = 1, pageSize = 10, ...filter } = request.query;

                const { data, message } = await pessoaListUseCase.execute({
                    currentPage: Number(page),
                    pageSize: Number(pageSize),
                    filter
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}