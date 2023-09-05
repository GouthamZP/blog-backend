import { RequestHandler } from "express";
import { models } from "../../models";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";
import { utils } from "../../utils";

/**
 * format of req.body should be { name: string, email: string, password: string }
 * no validation is performed in the controller. frontend should makes sure of the validation.
 * 
 */
export const register: RequestHandler = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if the user already exists.
        const doesExist = await models.User.exists({ email });
        if (doesExist) {
            return res.status(StatusCodes.BAD_REQUEST)
                .json(jsend.fail({ message: "email already registered, please login." }));
        }

        // hash the password to store in db.
        const hashedPassword = await utils.hashData(password);
        // create a new user
        const user = await models.User.create({ name, email , password: hashedPassword });

        // generate the jwt 
        const payload: { id: string, role: "user" | "admin" } = { id: user.id, role: "user" };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string);

        // send the jwt as a cookie
        return res.cookie("access_token", accessToken, { httpOnly: true })
            .status(StatusCodes.CREATED)
            .json(jsend.success(user.toObject()));
    } catch (error) {
        // TODO: should be passed to a global error handler.
        const err = error as Error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsend.error({ message: err.message }));
    }
};