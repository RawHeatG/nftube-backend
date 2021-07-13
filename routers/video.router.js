const express = require("express")
const router = express.Router();
const { Video } = require("../models/video.model");
const { catchHandler } = require("../controllers/catchHandler");

router.route("/")
.get(async (req,res) => {
    try{
        const videos = await Video.find({});
        res.status(200).json({success: true, data: videos})
    }catch(err){
        catchHandler({err})
    }
})

module.exports = router;