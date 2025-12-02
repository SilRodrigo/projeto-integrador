import { Request, Response } from 'express';
import { ApiResponse } from './ApiResponse';
import { AuthRequest } from '../middlewares/authMiddleware';

export interface IController<T, ReqType = Request> {
    handle(request: ReqType, response: Response): Promise<Response<ApiResponse<T>>>;
}

export interface IAuthController<T> extends IController<T, AuthRequest> { }