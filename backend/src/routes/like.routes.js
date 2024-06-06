import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { checkVerified, verifyToken } from "../middlewares/user.middlewares.js";
import {
    like
} from "../controllers/like.controllers.js";

const router = Router();

// LIKE BLOG
router.post("/like", verifyToken, checkVerified, upload.none(), like);


export default router;