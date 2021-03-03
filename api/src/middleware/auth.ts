import { Request, Response, NextFunction } from "express";
import { isLoggedIn, logOut } from "../auth";
import { SESSION_ABSOLUTE_TIMEOUT_MILLISEC } from "../config";
import { BadRequest, Unauthorized } from "../errors";
import { catchAsync } from "./errors";

export const guest = (req: Request, res: Response, next: NextFunction): void => {
    if (isLoggedIn(req)) {
        return next(new BadRequest("You are already logged in!"));
    }

    return next();
};

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    if (!isLoggedIn(req)) return next(new BadRequest("Please log in!"));

    return next();
};

export const active = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
        const
            now = Date.now(),
            { createdAt } = req.session;

        if (now > createdAt + Number(SESSION_ABSOLUTE_TIMEOUT_MILLISEC)) {
            await logOut(req, res);

            return next(new Unauthorized("Session expired"));
        }
    }

    return next();
});