import { Router } from "express";
import {
    login,
    logout,
    register
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/user.middlewares.js";

const router = Router();


router.post("/register", upload.none(), register);

router.post("/login", upload.none(), login);

router.post("/logout", verifyToken, upload.none(), logout);


export default router;