const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/")
    .post(async (req,res) => {
        try {
            const user = req.body;
            const isUsernameInDb = await User.findOne({ username: user.username})
            console.log(isUsernameInDb)
            if(isUsernameInDb) {
                return res.status(400).json({ success: false, error: "Username already taken"});
            }
            const newUser = new User(user);
            const savedUser = await newUser.save();
            res.status(200).json({ success: true, data: savedUser})
            
        }catch(err){
            res.status(200).json({ success: false, error: err})
        }     
    })

module.exports = router;