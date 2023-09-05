import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";

export const notfound: RequestHandler = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json(jsend.fail({ message: "Route does not exist" }));
}
