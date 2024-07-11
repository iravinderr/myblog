import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true
        },
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

export const COMMENT = mongoose.model("COMMENT", commentSchema);