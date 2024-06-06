import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { checkVerified, verifyToken } from "../middlewares/user.middlewares.js";
import {
    createComment
 } from "../controllers/comment.controllers.js";

const router = Router();

// COMMENT ON A BLOG
router.post("/create", verifyToken, checkVerified, upload.none(), createComment);


export default router;