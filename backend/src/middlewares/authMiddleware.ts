import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaUserRepository } from "../core/repositories";
import { errorResponse } from "../helpers/response";
import { IUser } from "../core/entities/user";
import { AwilixContainer } from "awilix";

export interface AuthRequest extends Request {
  user?: IUser;
  container?: AwilixContainer<{
    prismaUserRepository: PrismaUserRepository;
  }>;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, new Error("Token não fornecido"), 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const userRepository = req.container!.cradle.prismaUserRepository as PrismaUserRepository;
    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      return errorResponse(res, new Error("Usuário não encontrado"), 401);
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return errorResponse(res, new Error("Token expirado"), 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      return errorResponse(res, new Error("Token inválido"), 401);
    }

    return errorResponse(res, error || new Error("Erro inesperado na autenticação"), 401);
  }
};