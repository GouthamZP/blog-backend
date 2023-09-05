import { login } from "./auth/login";
import { logout } from "./auth/logout";
import { register } from "./auth/register";
import { createBlog } from "./blogPosts/create";
import { readBlogs, readSingleBlog } from "./blogPosts/read";
import { updateBlog } from "./blogPosts/update";
import { deleteBlog } from "./blogPosts/delete";

export const controllers = {
    register,
    login,
    logout,
    createBlog,
    readBlogs,
    readSingleBlog,
    updateBlog,
    deleteBlog
};