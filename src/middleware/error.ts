import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
  if(statusCode===401){
    message:"You are unauthorized so login again";
  }
  else if(statusCode===403){
    message:"You are forbidden";
  }
};
 