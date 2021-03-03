import { RequestHandler, Request, Response, NextFunction } from "express";

export const catchAsync = (handler: RequestHandler) => (...args: [Request, Response, NextFunction]): RequestHandler =>
    handler(...args).catch(args[2]);

export const notFound = (req: Request, res: Response, next: NextFunction): Response<any> =>
    res.status(404).json({ message: "Endpoint not found, please make sure the link and http method are correct." });

export const serverError = (err: any, req: Request, res: Response, next: NextFunction): void => {
    // eslint-disable-next-line no-console
    if (!err.status) console.error(err.stack);

    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};