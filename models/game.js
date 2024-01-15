import mongoose from "mongoose";
const { Schema, model} = mongoose;

const gameSchema = new Schema({
    title: String,
    publisher: String,
    year: Number
});

const Game = model("Game", gameSchema);

export default Game;