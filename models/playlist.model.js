const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    unique: [true, "Playlist with this name already exists"],
    required: [true, "Name is required"]
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = { Playlist };