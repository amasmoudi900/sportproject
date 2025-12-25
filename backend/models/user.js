// import mongoose module
const mongoose = require("mongoose");
// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    phone: String,
    role: String,
    photo: String
});

// create model name User
const user = mongoose.model("User", userSchema);
// export user model
module.exports = user;

