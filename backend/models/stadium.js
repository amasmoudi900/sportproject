// import mongoose module
const mongoose = require("mongoose");
// create stadium schema
const stadiumSchema = mongoose.Schema({
    capacity: Number,
    name: String,
    country: String,
    tId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});

// create model name Stadium
const stadium = mongoose.model("Stadium", stadiumSchema);
// export Stadium model
module.exports = stadium;

