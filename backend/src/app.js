import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// INITIALISING THE APP
const app = express();


// CORS 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// JSON PARSING
app.use(express.json({ limit: "16kb" }));

// URL PARSING
app.use(express.urlencoded({ extended: true, limit: "16kb"}));

// STATIC
app.use(express.static("public"));

// COOKIES PARSING
app.use(cookieParser());


// USER ROUTES
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);


export default app;