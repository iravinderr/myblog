import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse } from "../utils/response.utils.js";
import { USER } from "../models/user.models.js";


export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.accessToken;

    if (!token) {
        return ErrorResponse(res, 401, "Session expired. Login again");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET);

    const user = await USER.findById(decodedToken?._id).select("-password");
    if (!user) {
        return ErrorResponse(res, 404, "Unauthorised request");
    }

    req.user = user;
    next();
});

export const checkVerified = asyncHandler(async (req, res, next) => {
    if (!req.user.verified) {
        return ErrorResponse(res, 401, "User is not verified");
    }
    next();
});