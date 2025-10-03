import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaUsuarioRepository } from "../repositories";
import { errorResponse } from "../core/helpers/response";
import { IUsuario } from "../core/entities/usuario";
import { AwilixContainer } from "awilix";

export interface AuthRequest extends Request {
  usuario?: IUsuario;
  container?: AwilixContainer<{
    prismaUsuarioRepository: PrismaUsuarioRepository;
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

    const usuarioRepository = req.container!.cradle.prismaUsuarioRepository as PrismaUsuarioRepository;
    const usuario = await usuarioRepository.findById(decoded.usuarioId);

    if (!usuario) {
      return errorResponse(res, new Error("Usuário não encontrado"), 401);
    }

    req.usuario = usuario;
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