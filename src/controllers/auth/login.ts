
import jsend from "jsend";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { models } from "../../models";
import { utils } from "../../utils";

/**
 * format of req.body should be { email: string, password: string }
 * no validation is performed in the controller. frontend should makes sure of the validation.
 * 
 */
export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // check if the user exist
        const user = await models.User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED)
                .json(jsend.fail({ message: "email not registered, please login. " }));
        }

        // check if password is equal
        const isEqual = await utils.compareHash(password, user.password);
        if (!isEqual) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(jsend.fail({ message: "invalid password, please try again." }));
        }
        // generate the jwt 
        const payload: { id: string, role: "user" | "admin" } = { id: user.id, role: "user" };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string);

        // send the jwt as a cookie
        return res.cookie("access_token", accessToken, { httpOnly: true })
            .status(StatusCodes.OK)
            .json(jsend.success(user.toObject()));
    } catch (error) {
        // TODO: should be passed to a global error handler.
        const err = error as Error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsend.error({ message: err.message }));
        
    }
};