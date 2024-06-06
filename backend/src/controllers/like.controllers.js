import { BLOG } from "../models/blog.models.js";
import { LIKE } from "../models/like.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { SuccessResponse } from "../utils/response.utils.js";


export const like = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const blogId = req.body.blogId;

    await LIKE.create({ blogId, userId });

    return SuccessResponse(res, "Liked");
});

export const unlike = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const blogId = req.body.blogId;

    await LIKE.findOneAndDelete({ blogId, userId });

    return SuccessResponse(res, "Uniked");
});

export const countLikes = asyncHandler(async (req, res) => {
    const { blogId } = req.body;

    // const likes = await BLOG.aggregate([
    //     {
    //         $match: {
    //             _id: blogId
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "likes",
    //             localField: "_id",
    //             foreignField: "blogId",
    //             as: "likes"
    //         }
    //     },
    //     {
    //         $addFields: {
    //             likesCount: {
    //                 $size: "$likes"
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             likesCount: 1
    //         }
    //     }
    // ]);

    const likes = await LIKE.find({ blogId });

    return SuccessResponse(res, "", likes.length);
});