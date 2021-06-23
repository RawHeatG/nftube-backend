const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikedVideoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

const LikedVideo = mongoose.model('LikedVideo', LikedVideoSchema);

module.exports = { LikedVideo };