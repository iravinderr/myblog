import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.utils.js";


export const register = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    if (!(fullName || username || email || password)) {
        return ErrorResponse(res, 400, "Fill all the details");
    }

    let user = await USER.findOne({ username });
    if (user) {
        return ErrorResponse(res, 400, "Username is already taken");
    }

    user = await USER.findOne({ email });
    if (user) {
        return ErrorResponse(res, 400, "Account already exists with the entered email");
    }

    await USER.create({ fullName, username, email, password });

    return SuccessResponse(res, "Registered successfully");
});

export const login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email)) {
        return ErrorResponse(res, 400, "Enter your username or the email");
    }

    if (!password) {
        return ErrorResponse(res, 400, "Password is missing");
    }

    const user = await USER.findOne({ $or: [{ username }, { email }]});
    if (!user) {
        return ErrorResponse(res, 404, "Account does not exists");
    }

    const passwordCorrect = await user.validatePassword(password);
    if (!passwordCorrect) {
        return ErrorResponse(res, 401, "Password is incorrect");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        message: "Logged in",
        accessToken,
        refreshToken
    });
});

export const logout = asyncHandler(async (req, res) => {
    await USER.findByIdAndUpdate(req.user?._id, { refreshToken: "" });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        success: true,
        message: "Logged out"
    });
});