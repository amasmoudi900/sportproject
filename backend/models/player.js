// import mongoose module
const mongoose = require("mongoose");
// create player schema
const playerSchema = mongoose.Schema({
    nbr: Number,
    age: Number,
    name: String,
    position: String,
    // tId: FK (sa valeur est récupérée d'un _id d'un Team)
    // tId: de type ObjectId
    tId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});

// create model name Player
const player = mongoose.model("Player", playerSchema);
// export Player model
module.exports = player;

