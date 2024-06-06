import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true
        },
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

export const COMMENT = mongoose.model("COMMENT", commentSchema);