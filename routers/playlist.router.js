const express = require('express');
const router = express.Router();
const { Playlist } = require('../models/playlist.model');

router.route('/:userId')
    .get(async (req, res) => {
        try {
            const { userId } = req.params;
            const playlists = await Playlist.find({ user: { _id: userId } });
            res.json({ success: true, data: playlists });
        }catch(err) {
            res.json({ success: false, error: err })
        }
    })
    .post(async (req, res) => {
        try {
            const { userId } = req.params;
            const playlist = new Playlist({ ...req.body, user: userId })
            await playlist.save();
            res.staus(200).json({ success: true, data: playlist })
        }catch(err) {
            res.staus(500).json({ success: false, error: err })
        }
    });

router.route('/:playlistId')
    .get(async (req, res) => {
        try {
        const { playlistId } = req.params;
        const playlist = await Playlist.find({ _id: playlistId });
        res.json({ success: true, data: playlist });
        }catch(err) {
        res.json({ success: false, error: err })
        }
    })
    .post(async (req, res) => {
        const { playlistId } = req.params;
        const { videoId } = req.body;
        try {
            const playlist = await Playlist.findOne({ _id: playlistId });
            const isVideoInPlaylist = playlist.videos.includes(videoId);

            isVideoInPlaylist ?
                playlist.videos.pull(videoId)
            :
                playlist.videos.push(videoId);

            const savedPlaylist = await playlist.save();
            res.json({ success: true, data: savedPlaylist })
        }catch(err) {
        console.log(error);
        res.json({ success: false, err: error })
    }
  })
    .delete(async (req, res) => {
        try {
            const { playlistId } = req.params;
            await Playlist.findByIdAndRemove({ _id: playlistId })
            res.json({ success: true })
        }catch(err) {
            res.json({success: false, error: err })
        }
    })
  

module.exports = router;