import { BLOG } from "../models/blog.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { SuccessResponse } from "../utils/response.utils.js";


export const createBlog = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { title, content } = req.body;

    const blog = await BLOG.create({ title, content, userId });

    return SuccessResponse(res, "Blog created", blog);
});

export const editBlog = asyncHandler(async (req, res) => {
    const { blogId, title, content } = req.body;
    
    const blog = await BLOG.findByIdAndUpdate(blogId, { title, content });
    
    return SuccessResponse(res, "Blog created", blog);
});

export const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;

    await BLOG.findByIdAndDelete(blogId);

    return SuccessResponse(res, "Blog deleted");
});

export const getUserBlogs = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const blogs = await BLOG.find({ userId });

    return SuccessResponse(res, "", blogs);
});