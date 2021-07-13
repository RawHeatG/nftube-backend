const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  id: { 
    type: String,
    required: [true, "Id is required"]
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = { Playlist };