const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex");

const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const server = express();

server.use(express.json());
// server.use(session({
//     name: "hidden",
//     secret: "you aren't finding this one out",
//     cookie: {
//         maxAge: 1000 * 60 * 60,
//         secure: false,
//         httpOnly: true
//     },
//     resave: false,
//     saveUninitialized: false,

//     store: new KnexSessionStore({
//         knex: require("../database/connection.js"),
//         tablename: "sessions",
//         sidfieldname: "sid",
//         createtable: true,
//         clearInterval: 1000 * 60 * 60
//     }),
// }));

server.use("/api/users", usersRouter);
server.use("/api", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "api is up" });
});

module.exports = server;