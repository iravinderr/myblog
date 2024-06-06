import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        blogId: {
            type: Schema.Types.ObjectId,
            ref: "BLOG",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
    }
);

export const LIKE = mongoose.model("LIKE", likeSchema);