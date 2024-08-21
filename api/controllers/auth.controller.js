const router = require("express").Router();
const res = require("express/lib/response");
const bcrypt = require("bcrypt");
const User = require("../models/User");


//Register
router.post("/register", async (req, res) => {

    try {
        console.log('inside try')

        //create new user
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        //save user
        const newUser = await user.save();
        res.status(200).json({ message: "New user has been registered" });
        return newUser
    }
    catch (error) {
        console.log(error);
    }
    return

});


//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password!")

        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }

});

module.exports = router;