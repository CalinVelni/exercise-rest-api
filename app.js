import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Game from "./models/game";
import mongoose from "mongoose";
import morgan from "morgan";
const { MONGO_URI } = process.env;

// SERVER SETTINGS
const app = express();
app.use(cors({origin: "*"}));
app.use(morgan("dev"));
app.use(express.json());



// DATABASE & SERVER RUN
mongoose.connect(MONGO_URI)
    .then( () => {
        console.log("Mongo connected successfully.");
        app.listen(3000, () => {
            console.log("Server listening on port 3000.");
        });
    })
    .catch(err => console.error(err));

export default app;