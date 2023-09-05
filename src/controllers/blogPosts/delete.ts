import { RequestHandler } from "express";
import { models } from "../../models";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";

export const deleteBlog: RequestHandler = async (req, res, next) => {
    const { id: blogId } = req.params;
    const { id: owner } = req.user;
    // check if blog post exist or not.
    const blog = await models.BlogPost.findById(blogId);
    if (!blog) {
        return res.status(StatusCodes.NOT_FOUND).json(jsend.fail({ message: `No blog with id(${blogId}) exists in db.` }));
    }
    // check if the blogpost belongs to the currently logged in user.
    if (blog.owner.toString() !== owner) {
        return res.status(StatusCodes.FORBIDDEN).json(jsend.fail({ message: "Forbidden." }));
    }
    await models.BlogPost.findByIdAndDelete(blogId);
    return res.status(StatusCodes.OK).json(jsend.success({ message: "Deleted." }));
}