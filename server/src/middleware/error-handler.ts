import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError){
        return res.status(err.statusCode).json({success: false, error: err.message})
    }
    
    if(err instanceof Error){
        console.log(err);
        return res.status(500).json({success: false, error: "Internal Server Error"});

    }

    return res.status(500).json({success: false, error: "Internal Server Error"});
};

export const notFoundHandler = (_req: Request, res: Response) => {
    return res.status(404).json({success: false, error: "Route not found"});
}