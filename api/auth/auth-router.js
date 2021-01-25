const express = require("express");
const User = require("../users/users-model");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    User.add({ username, password: hashed, role: 2 })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const supposedUser = await User.getBy({ username }).first();
        if (supposedUser && bcrypt.compareSync(password, supposedUser.password)) {
            req.session.user = supposedUser;
            res.json({ message: "Logged in", cookie: supposedUser.id });
        } else {
            res.status(401).json("You shall not pass!");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;