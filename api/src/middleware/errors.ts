import { RequestHandler, Request, Response, NextFunction } from "express";

export const catchAsync = (handler: RequestHandler) => (...args: [Request, Response, NextFunction]): RequestHandler => {
    return handler(...args).catch();
};