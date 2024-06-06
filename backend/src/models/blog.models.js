import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
    },

    { timestamps: true }
);

export const BLOG = mongoose.model("BLOG", blogSchema);