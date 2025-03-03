import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error as Error); 
    }
  };
};