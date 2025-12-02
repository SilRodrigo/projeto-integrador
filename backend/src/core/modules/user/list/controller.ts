import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { parseListParams } from '../../../../helpers/parseListParams';
import { IController } from '../../../../types/Controller';
import { IUser } from '../../../entities/user';
import { IUserListUseCase } from './useCase';

interface IFactoryParams {
    userListUseCase: IUserListUseCase;
}

export interface IUserListController extends IController<IUser> { }

export default function userListControllerFactory({
    userListUseCase
}: IFactoryParams): IUserListController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { currentPage, pageSize, filter, order } = parseListParams(request.query, 10);

                const { data, message } = await userListUseCase.execute({
                    currentPage,
                    pageSize,
                    filter,
                    order
                });

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}