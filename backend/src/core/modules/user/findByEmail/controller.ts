import { Response } from 'express';
import { errorResponse, successResponse } from '../../../../helpers/response';
import { IController } from '../../../../types/Controller';
import { IUser } from '../../../entities/user';
import { IUserFindByEmailUseCase } from './useCase';

interface IFactoryParams {
    userFindByEmailUseCase: IUserFindByEmailUseCase;
}

export interface IUserFindByEmailController extends IController<IUser> { }

export default function userFindByEmailControllerFactory({
    userFindByEmailUseCase
}: IFactoryParams): IUserFindByEmailController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { email } = request.body.filter;

                if (!email) {
                    throw new Error('Email is required.');
                }

                const { data, message } = await userFindByEmailUseCase.execute(email);

                return successResponse(response, data, message);
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
