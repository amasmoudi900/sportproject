// import express module
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require("path");
const jwt = require('jsonwebtoken');
const session = require('express-session');
const axios = require("axios");

const mongoose = require('mongoose');
// sportDB : DB name
// mongodb://127.0.0.1:27017 : Base URL MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');

// creates express app
const app = express();

// App Configuration
app.use(cors());
// Send JSON response to FE
app.use(express.json());
// Get Object from Req
app.use(express.urlencoded({ extended: true }));
// Multer configuration
app.use('/myShortCut', express.static(path.join('backend/uploads')))
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Session Configuration
const secretKey = 'crococoder2025-session-sep';
app.use(session({
    secret: secretKey,
}));

// Import models
const Match = require("./models/match");
const User = require("./models/user");
const Team = require("./models/team");
const Player = require("./models/player");
const Stadium = require("./models/stadium");

// DB Simulation
let matches = [
    { id: 1, scoreOne: 0, scoreTwo: 0, teamOne: 'Team A', teamTwo: 'Team B' },
    { id: 2, scoreOne: 2, scoreTwo: 1, teamOne: 'Team C', teamTwo: 'Team D' },
    { id: 3, scoreOne: 1, scoreTwo: 1, teamOne: 'Team E', teamTwo: 'Team A' }
];

let players = [
    { id: 1, name: 'Player 1', nbr: "10", position: "ATK", age: 30, teamId: 1 },
    { id: 2, name: 'Player 2', nbr: "8", position: "MID", age: 30, teamId: 2 },
    { id: 3, name: 'Player 3', nbr: "4", position: "GK", age: 25, teamId: 1 },
    { id: 4, name: 'Player 4', nbr: "12", position: "DEF", age: 25, teamId: 1 },
    { id: 5, name: 'Player 5', nbr: "2", position: "MID", age: 25, teamId: 1 },
    { id: 6, name: 'Player 6', nbr: "36", position: "ATK", age: 25, teamId: 1 },
];

let teams = [
    { id: 1, name: 'Team A', owner: "Ali", foundation: 1899, players: [5, 6] },
    { id: 2, name: 'Team B', owner: "Salah", foundation: 1900, players: [1, 2] },
    { id: 3, name: 'Team C', owner: "Med", foundation: 1920, players: [3, 4] }
];

let users = [
    {
        firstName: "Ali",
        lastName: "Hassan",
        email: "ali@gmail.com",
        password: "123456",
        phone: 24600900
    },
    {
        firstName: "Sara",
        lastName: "Khaled",
        email: "sara@gmail.com",
        password: "123456",
        phone: 23129129
    },
    {
        firstName: "Omar",
        lastName: "Fathi",
        email: "omar@gmail.com",
        password: "123456",
        phone: 25009000
    }
];

function generateId(Tab) {
    let max;
    if (Tab.length == 0) {
        max = 0;
    } else {
        max = Tab[0].id;
        for (let i = 1; i < Tab.length; i++) {
            if (Tab[i].id > max) {
                max = Tab[i].id;
            }
        }
    }
    return max + 1;
}

// Traitement Logique des reqs
// Business Logic: Get All Matches
app.get("/matches", (req, res) => {
    console.log("Business Logic: Get All Matches");
    Match.find().then(
        (data) => {
            console.log("Here is data from matches collection ", data);
            res.json({ tab: data, nbr: data.length });
        }
    )
});

// Business Logic: Get Match By ID
// :id => dynamic parameter
app.get("/matches/:id", (req, res) => {
    console.log("Business Logic: Get Match By ID");
    let matchId = req.params.id;
    console.log("Here is ID", matchId);
    Match.findById(matchId).then(
        (data) => {
            console.log("Here is data from matches collection", data);
            if (data) {
                res.json({ obj: data })
            } else {
                res.json({ msg: "Match not found!" });
            }
        }
    )
});

// Business Logic: Delete Match By ID
app.delete("/matches/:id", (req, res) => {
    console.log("Business Logic: Delete Match By ID", req.params.id);
    Match.deleteOne({ _id: req.params.id }).then(
        (deleteRes) => {
            console.log("Here is response from DB after delete", deleteRes);
            if (deleteRes.deletedCount == 1) {
                res.json({ msg: "Match deleted successfully!", isDeleted: true });
            } else {
                res.json({ msg: `Match N° ${req.params.id} not found`, isDeleted: false });
            }
        }
    )
});

// Business Logic: Add New Match
app.post("/matches", (req, res) => {
    console.log("Business Logic: Add Match", req.body);
    let matchObj = new Match(req.body);
    matchObj.save();
    res.json({ msg: "Added with success!" });
});

// Business Logic: Edit Match
app.put("/matches", (req, res) => {
    console.log("Business Logic: Edit Match", req.body);
    let newMatch = req.body;
    Match.updateOne({ _id: newMatch._id }, newMatch).then(
        (updateRes) => {
            console.log("Here is  response after update match", updateRes);
            if (updateRes.nModified == 1) {
                res.json({ msg: "Edited with success!" });
            } else {
                res.json({ msg: "Not Edited!!" });
            }
        }
    )
});

// Business Logic: Search Matches By Team Name SOL 1
app.post("/matches/searchMatches", (req, res) => {
    console.log("Business Logic: Search Matches By Team Name");
    let teamName = req.body.teamName;
    console.log("here is object", teamName);
    let results = [];
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].teamOne == teamName || matches[i].teamTwo == teamName) {
            results.push(matches[i]);
        }
    }
    if (results.length > 0) {
        res.json({ tab: results });
    } else {
        res.json({ msg: "No matches found!" });
    }
});


// Business Logic: Search Matches By Team Name SOL 2
app.get("/matches/searchMatches/:name", (req, res) => {
    console.log("Business Logic: Search Matches By team name", req.params.name);
    let teamName = req.params.name;
    console.log("here is object", teamName);
    let results = [];
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].teamOne == teamName || matches[i].teamTwo == teamName) {
            results.push(matches[i]);
        }
    }
    if (results.length > 0) {
        res.json({ tab: results });
    } else {
        res.json({ msg: "No matches found!" });
    }
});

// Business Logic: Search Player By Name
app.get("/players/searchPlayerByName/:name", (req, res) => {
    console.log("Business Logic: Search Player By Name", req.params.name);
    // Search Player
    let foundPlayer;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == req.params.name) {
            foundPlayer = players[i];
            break;
        }
    }
    console.log("here is found player", foundPlayer);
    // If player is found => Search Team
    if (foundPlayer) {
        let foundTeam;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id == foundPlayer.teamId) {
                foundTeam = teams[i];
                break;
            }
        }
        if (foundTeam) {
            res.json({ player: foundPlayer, team: foundTeam })
        }
    } else {
        res.json({ msg: "Player not found!" });
    }


});

function searchPlayerById(id) {
    let player;
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == id) {
            player = players[i];
            break;
        }
    }
    return player;
}
// Business Logic : Search Team By Name
app.get("/teams/searchByName/:name", (req, res) => {
    console.log("Business Logic: Search Team By Name",
        req.params.name);
    // Search Team
    let foundTeam;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == req.params.name) {
            foundTeam = teams[i];
            break;
        }
    }
    console.log("Here is found team", foundTeam);
    if (foundTeam) {
        let foundPlayers = [];
        for (let i = 0; i < foundTeam.players.length; i++) {
            let p = searchPlayerById(foundTeam.players[i])
            foundPlayers.push(p)
        }
        res.json({ team: foundTeam, players: foundPlayers });
    } else {
        res.json({ msg: "Team not found!" });
    }
});


// Business Logic : Signup (Add User)
app.post("/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("Business Logic: Signup (Add User)", req.body);
    let user = req.body;
    // search user by email to check email uniqueness
    User.findOne({ email: user.email }).then(
        // data : null or user object | data ==  search result
        (data) => {
            console.log("Here is data after search user by email", data);
            if (data) {
                res.json({ msg: "Email already exists", isAdded: false })
            } else {
                bcrypt.hash(req.body.pwd, 10).then(
                    (cryptedPwd) => {
                        console.log("Here is crypted pwd", cryptedPwd);
                        req.body.pwd = cryptedPwd;
                        // myShortCut == backend/uploads
                        req.body.photo = "http://localhost:3000/myShortCut/" + req.file.filename;
                        let userObj = new User(req.body);
                        userObj.save();
                        res.json({ msg: "User added successfully!", isAdded: true });
                    }
                )
            }
        }
    )
});

// Business Logic : Login
// 0 => Invalid email! 
// 1 => Invalid pwd!
// 2 => Welcome
app.post("/users/login", (req, res) => {
    console.log("Business Logic : Login", req.body);
    // Check if user exists by email
    User.findOne({ email: req.body.email }).then(
        // data: DB response (null or object)
        (data) => {
            console.log("Here is found user by email", data);
            if (!data) {
                res.json({ msg: "0" });
            } else {
                // Check PWDs
                bcrypt.compare(req.body.pwd, data.pwd).then(
                    (pwdResult) => {
                        // pwdResult : comparaison des pwds ( true or false)
                        console.log("Here is pwd result", pwdResult);
                        if (!pwdResult) {
                            res.json({ msg: "1" });
                        } else {
                            let userToSend = {
                                fName: data.firstName,
                                lName: data.lastName,
                                photo: data.photo,
                                role: data.role
                            }
                            const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });
                            console.log("Here is generated token", token);

                            res.json({ msg: "2", user: token });
                        }
                    }
                )
            }
        }
    )
});

// Business Logic: Get All Players
app.get("/players", (req, res) => {
    console.log("Business Logic: Get All Players");
    Player.find().populate("tId").then(
        (data) => {
            console.log("Here is data from players collection ", data);
            res.json({ players: data, nbr: data.length });
        }
    )
});

// Business Logic: Get Player By ID
// :id => dynamic parameter
app.get("/players/:id", (req, res) => {
    console.log("Business Logic: Get Player By ID");
    let playerId = req.params.id;
    console.log("Here is ID", playerId);
    Player.findById(playerId).then(
        (data) => {
            console.log("Here is data from players collection", data);
            if (data) {
                res.json({ player: data })
            } else {
                res.json({ msg: "Match not found!" });
            }
        }
    )
});

// Business Logic: Delete Player By ID
app.delete("/players/:id", (req, res) => {
    console.log("Business Logic: Delete Player By ID", req.params.id);
    Player.deleteOne({ _id: req.params.id }).then(
        (deleteRes) => {
            console.log("Here is response from DB after delete", deleteRes);
            if (deleteRes.deletedCount == 1) {
                res.json({ msg: "Player deleted successfully!", isDeleted: true });
            } else {
                res.json({ msg: `Player N° ${req.params.id} not found`, isDeleted: false });
            }
        }
    )
});

// Business Logic: Add New Player
app.post("/players", (req, res) => {
    // req.body = { name:.., age:.., position: .., nbr: .., teamId: '...'}
    console.log("Business Logic: Add Player", req.body);
    // Search Team By ID
    Team.findById(req.body.teamId).then(
        (foundTeam) => {
            console.log("Here is found team from DB", foundTeam);
            // foundTeam = {name:.., owner:..., foundation: .., _id: ..., playersId: []}
            let playerObj = new Player({
                // model attribute : FE value
                name: req.body.name,
                age: req.body.age,
                nbr: req.body.nbr,
                position: req.body.position,
                // tId: ObjectId
                tId: foundTeam._id  //(req.body.teamId : string)
            });
            playerObj.save(
                (err, success) => {
                    console.log("Here is success", success);
                    console.log("Here is error", err);

                    if (err) {
                        res.json({ msg: "Player Not saved" });
                    } else {
                        // Affecter playerId into team (playersId = [......, ......., ......])
                        foundTeam.playersId.push(success._id);
                        foundTeam.save();
                        res.json({ msg: "Player saved with success" });
                    }
                }
            );
        }
    )
});

// Business Logic: Edit Player
app.put("/players", (req, res) => {
    console.log("Business Logic: Edit Player", req.body);
    let newPlayer = req.body;
    Player.updateOne({ _id: newPlayer._id }, newPlayer).then(
        (updateRes) => {
            console.log("Here is  response after update player", updateRes);
            if (updateRes.nModified == 1) {
                res.json({ msg: "Edited with success!" });
            } else {
                res.json({ msg: "Not Edited!!" });
            }
        }
    )
});

// Business Logic: Get All Teams
app.get("/teams", (req, res) => {
    console.log("Business Logic: Get All teams");
    Team.find().populate("playersId").then(
        (data) => {
            console.log("Here is data from teams collection ", data);
            res.json({ teams: data, nbr: data.length });
        }
    )
});
// Business Logic: Add New Team
app.post("/teams", (req, res) => {
    console.log("Business Logic: Add Team", req.body);
    let teamObj = new Team(req.body);
    teamObj.save();
    res.json({ msg: "Added with success!" });
});

// Business Logic: Delete Team
app.delete("/teams/:id", (req, res) => {
    console.log("Here is Business Logic : Delete Team", req.params.id);
    let teamId = req.params.id; // contient la valeur de l'_id du team
    let msg = "";
    Player.deleteMany({ tId: teamId }).then(
        (deletePlayersResponse) => {
            console.log("Here is deletePlayersResponse", deletePlayersResponse);
            if (deletePlayersResponse.deletedCount == 0) {
                msg = "Team does not have any players";
            } else {
                msg = "Players deleted with success";
            }
            Team.deleteOne({ _id: teamId }).then(
                (deleteTeamResponse) => {
                    console.log("Here is deleteTeamResponse", deleteTeamResponse);
                    if (deleteTeamResponse.deletedCount == 0) {
                        res.json({ teamRes: "Team Not Deleted" })
                    } else {
                        res.json({ teamRes: "Team deleted with success", msgRes: msg })
                    }
                }
            )
        }
    )
})

// Business Logic: Add New Stadium
app.post("/stadiums", (req, res) => {
    console.log("Here is Business Logic: Add Stadium", req.body);
    // req.body = {name:..., country:..., capacity:..., teamId: ""}
    Team.findOne({ _id: req.body.teamId }).then(
        (foundTeam) => {
            // foundTeam = {_id: ..., name:..., owner: ..., foundation:....}
            console.log("Here is found team", foundTeam);
            let stadiumObj = new Stadium({
                name: req.body.name,
                capacity: req.body.capacity,
                country: req.body.country,
                tId: foundTeam._id // ObjectId(req.body.teamId)
            });

            stadiumObj.save(
                (err, success) => {
                    if (err) {
                        res.json({ msg: "Stadium not saved" });
                    } else {
                        foundTeam.stadiumId = success._id;
                        foundTeam.save();
                        res.json({ msg: "Stadium saved with success" });
                    }
                }
            )
        }
    )
});

// Business Logic: Get All Stadiums
app.get("/stadiums", (req, res) => {
    console.log("Here Business logic : Get All Stadiums");
    Stadium.find().then(
        (response) => {
            res.json({ tab: response })
        }
    )
});

// Business Logic: search Weather
app.post("/weather", (req, res) => {
    console.log("Here is weather object", req.body);
    let apiKey = "62ee756a34835483299877a61961cafb";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${apiKey}`;
    axios.get(apiURL).then(
        (apiResponse) => {
            console.log("Here is api response", apiResponse.data);
            let weatherResponse = {
                temp: apiResponse.data.main.temp,
                pressure: apiResponse.data.main.pressure,
                humidity: apiResponse.data.main.humidity,
                speed: apiResponse.data.wind.speed
            }
            res.json({ data: weatherResponse });
        }
    )
});

// Business Logic : Delete User
app.delete("/users/:id", (req, res) => {
    console.log("Here into BL: delete User", req.params.id);
})

// export app
// make app importable to other files
module.exports = app;