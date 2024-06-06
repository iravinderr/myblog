import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { checkVerified, verifyToken } from "../middlewares/user.middlewares.js";
import {
    createBlog,
    deleteBlog,
    editBlog
} from "../controllers/blog.controllers.js";

const router = Router();

// CREATE BLOG
router.post("/create", verifyToken, checkVerified, upload.none(), createBlog);

// EDIT BLOG
router.put("/edit", verifyToken, upload.none(), editBlog);

// DELETE BLOG
router.delete("/delete", verifyToken, deleteBlog);


export default router;