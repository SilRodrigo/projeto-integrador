import { Response } from "express";

export function successResponse<T>(response: Response, data: T, message: string = 'Success', status: number = 200): Response {
    return response.status(status).json({ data, message });
}

export function errorResponse(response: Response, error: any, status: number = 400): Response {
    return response.status(status).json({
        data: null,
        message: error?.message || 'Unexpected error'
    });
}