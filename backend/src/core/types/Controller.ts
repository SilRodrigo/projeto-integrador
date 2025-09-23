import { Request, Response } from 'express';
import { ApiResponse } from './ApiResponse';

export interface IController<T> {
    handle(request: Request, response: Response): Promise<Response<ApiResponse<T>>>;
}