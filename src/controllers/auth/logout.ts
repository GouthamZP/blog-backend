import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";

export const logout: RequestHandler = async (req, res, next) => {
    return res.clearCookie("access_token")
        .status(StatusCodes.OK)
        .json(jsend.success({ message: "Logged out." }));
};