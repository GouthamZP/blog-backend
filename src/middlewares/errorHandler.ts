import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";


export const errorHandler: RequestHandler = (req, res, next) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsend.error({ message: "Please Try again." }));
}
