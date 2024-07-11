import dotenv from "dotenv";
dotenv.config({ path: "./.env"});
import app from "./app.js";
import connectDB from "./config/database.config.js";



const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER IS LIVE AT PORT ${PORT}`);
    })
});