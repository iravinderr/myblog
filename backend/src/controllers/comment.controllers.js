import { COMMENT } from "../models/comment.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { SuccessResponse } from "../utils/response.utils.js";


export const createComment = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { blogId, content} = req.body;

    const comment = await COMMENT.create({ content, blogId, userId });

    return SuccessResponse(res, "Commented", comment);
});