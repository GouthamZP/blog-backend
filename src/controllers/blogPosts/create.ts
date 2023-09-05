import { RequestHandler } from "express";
import { models } from "../../models";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";


/**
 * format of req.body should be { title: string, content: string }
 * no validation is performed in the controller. frontend should makes sure of the validation.
 * 
 */
export const createBlog: RequestHandler = async (req, res, next) => {
    const { title, content } = req.body;
    const { id: owner } = req.user;

    const blog = await models.BlogPost.create({ title, content, owner });

    return res.status(StatusCodes.CREATED).json(jsend.success(blog.toObject()));
}