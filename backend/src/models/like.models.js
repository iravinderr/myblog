import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: "BLOG",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
    }
);

export const LIKE = mongoose.model("LIKE", likeSchema);