const express = require('express');
const router = express.Router();
const { Playlist } = require('../models/playlist.model');

router.route('/:userId')
    .get(async (req, res) => {
        try {
            const { userId } = req.params;
            const playlists = await Playlist.find({ user: { _id: userId } }).populate("videos");
            console.log(playlists)
            res.status(200).json({ success: true, data: playlists });
        }catch(err) {
            console.log(err)
            res.status(500).json({ success: false, error: err })
        }
    })
    .post(async (req, res) => {
        try {
            const { userId } = req.params;
            const playlist = new Playlist({ ...req.body, user: userId })
            await playlist.save();
            res.status(200).json({ success: true, data: playlist })
        }catch(err) {
            res.status(500).json({ success: false, error: err })
        }
    });



router.route('/:userId/:playlistId')
    .get(async (req, res) => {
        try {
        const { userId, playlistId } = req.params;
        console.log(userId, playlistId)
        const playlist = await Playlist.findOne({ user: userId, id: playlistId }).populate("videos");
        console.log(playlist)
        res.status(200).json({ success: true, data: playlist });
        }catch(err) {
        res.status(500).json({ success: false, error: err })
        }
    })
    .post(async (req, res) => {
        const { userId, playlistId } = req.params;
        const { _id: videoId } = req.body;
        console.log(playlistId)
        console.log(req.body)
        console.log({videoId})
        try {
            const playlist = await Playlist.findOne({ user: userId, id: playlistId });
            console.log(playlist)
            const isVideoInPlaylist = playlist.videos.includes(videoId);

            isVideoInPlaylist ?
                playlist.videos.pull(videoId)
            :
                playlist.videos.push(videoId);

            const savedPlaylist = await playlist.save();
            res.status(200).json({ success: true, data: savedPlaylist })
        }catch(err) {
        console.log(error);
        res.status(500).json({ success: false, err: error })
    }
  })
    .delete(async (req, res) => {
        try {
            const { playlistId } = req.params;
            await Playlist.findByIdAndRemove({ _id: playlistId })
            res.status(200).json({ success: true })
        }catch(err) {
            res.status(500).json({success: false, error: err })
        }
    })
router.route('/:userId/:playlistId/:videoId')
    .get(async (req,res) => {
        try{
            console.log(req.params, "Hi Iam here")
            const { userId, playlistId, videoId } = req.params;
            const playlist = await Playlist.findOne({ user: userId, id: playlistId });
            const isVideoInPlaylist = playlist.videos.includes(videoId);
            console.log(isVideoInPlaylist)
            res.status(200).json({ success: true, data: isVideoInPlaylist})
        }catch(err){
            res.status(500).json({success: false, error: err })
        }
    })

  

module.exports = router;