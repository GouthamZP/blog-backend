import { RequestHandler } from "express";
import { models } from "../../models";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";


/**
 * format of req.body should be { title?: string, content?: string }
 * no validation is performed in the controller. frontend should makes sure of the validation.
 * 
 */
export const updateBlog: RequestHandler = async (req, res, next) => {
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
    // update the blog post
    const updated = await models.BlogPost.findByIdAndUpdate(blogId, req.body, { new: true, runValidators: true });
    return res.status(StatusCodes.OK).json(jsend.success(updated!.toObject()));
}