import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Game from "./models/game.js";
import mongoose from "mongoose";
import morgan from "morgan";
const { MONGO_URI } = process.env;


// SERVER SETTINGS
const app = express();
app.use(cors({origin: "*"}));
app.use(morgan("dev"));
app.use(express.json());


// CREATE A GAME 
app.post("/games/", async (req, res) => {
    try{
        const game = await Game.create(req.body);
        res.send(game);
    }
    catch(err){
        res.status(500).send(err.message);
    };
});


// READ GAMES
app.get("/games/", async (req, res) => {
    try{
        const games = await Game.find();
        res.send(games);
    }
    catch(err){
        res.status(404).send(err.message);
    };
});

// READ GAME
app.get("/games/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const game = await Game.findById(id);
        res.send(game);
    }
    catch(err){
        res.status(404).send(err.message);
    };
});


// UPDATE WHOLE GAME
app.put("/games/:id", async (req, res) => {
    try{
        const reqLength = Object.keys(req.body).length;
        const validProps = Object.keys(Game.schema.obj);
        if(reqLength !== validProps.length){
            throw new Error(`Games must contain ${validProps} properties.`);
        };
        const { id } = req.params;
        await Game.findByIdAndUpdate(id, req.body);
        const game = await Game.findById(id);
        res.send(game);
    }
    catch(err){
        res.status(400).send(err.message);
    };
});

// UPDATE GAME PROPS
app.patch("/games/:id", async (req, res) => {
    try{
        const reqLength = Object.keys(req.body).length;
        const validProps = Object.keys(Game.schema.obj);
        if(reqLength >= validProps.length){
            throw new Error(`Cannot edit more than ${validProps.length - 1} properties and they must be between ${validProps}.`);
        };
        const { id } = req.params;
        await Game.findByIdAndUpdate(id, req.body);
        const game = await Game.findById(id);
        res.send(game);
    }
    catch(err){
        res.status(400).send(err.message);
    };
});


// DELETE GAME
app.delete("/games/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const game = await Game.findByIdAndDelete(id);
        res.send("Game deleted successfully.");
    }
    catch(err){
        res.status(404).send(err.message);
    };
});


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