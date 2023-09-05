import { NextFunction, Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";
import jwt, { JwtPayload } from "jsonwebtoken";


export const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(StatusCodes.UNAUTHORIZED)
            .json(jsend.fail({ message: `Not logged in.` }));
    }

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET as string) as { id: string, role: "user" | "admin" };
        req.user = payload;
    } catch (error) {
        const err = error as Error;
        return res.status(StatusCodes.UNAUTHORIZED).json(jsend.fail({ message: err.message }));
    }
    return next();
}

export const authorize = (...roles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user.role;
        if (!roles.includes(role)) {
            return res.status(StatusCodes.FORBIDDEN).json(jsend.fail({ message: `Route forbidden for ${role}.`}));
        }
        return next();
    }
}