// import mongoose module
const mongoose = require("mongoose");
// create match schema
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String
});

// create model name Match
const match = mongoose.model("Match", matchSchema);
// export Match model
module.exports = match;

