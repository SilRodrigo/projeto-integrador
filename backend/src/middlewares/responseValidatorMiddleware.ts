import { Request, Response, NextFunction } from 'express';

export function responseValidator(req: Request, res: Response, next: NextFunction) {
  const oldJson = res.json;

  res.json = function (data: any) {
    if (!data || typeof data !== 'object' || !('data' in data) || !('message' in data)) {
      console.error(`[ERROR] Resposta inválida na rota ${req.method} ${req.path}:`, data);
      
      return res.status(500).json({
        data: null,
        message: "Internal Server Error",
      });
    }

    return oldJson.call(this, data);
  };

  next();
}
