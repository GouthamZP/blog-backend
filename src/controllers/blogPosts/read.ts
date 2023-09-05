import { RequestHandler } from "express";
import { models } from "../../models";
import { StatusCodes } from "http-status-codes";
import jsend from "jsend";

export const readBlogs: RequestHandler = async (req, res, next) => {
    /**
     * TODO:
     * should add query parameters for skip and limit
     */
    const blogs = await models.BlogPost.find({});
    return res.status(StatusCodes.OK).json(jsend.success(blogs));
}

export const readSingleBlog: RequestHandler = async (req, res, next) => {
    const { id: blogId } = req.params;

    const blog = await models.BlogPost.findById(blogId);
    if (!blog) {
        return res.status(StatusCodes.NOT_FOUND).json(jsend.fail({ message: `No blog with id(${blogId}) exists in db.` }));
    }
    return res.status(StatusCodes.OK).json(jsend.success(blog.toObject()));
}