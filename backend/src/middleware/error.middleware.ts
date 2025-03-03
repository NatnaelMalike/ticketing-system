import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  };
export const unhandledPromise = (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
}
export const unExpectedError = (error: Error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  }