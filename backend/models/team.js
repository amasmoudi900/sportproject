// import mongoose module
const mongoose = require("mongoose");
// create team schema
const teamSchema = mongoose.Schema({
    foundation: Number,
    name: String,
    owner: String,
    // playersId : FK tableau d'identifiants de 
    // type ObjectId du modele Player
    playersId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
        }
    ],
    stadiumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stadium"
    }
});

// create model name Team
const team = mongoose.model("Team", teamSchema);
// export Team model
module.exports = team;

