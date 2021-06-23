const mongoose = require('mongoose');
const { Schema } = mongoose;

const WatchLaterSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

const WatchLater = mongoose.model('WatchLater', WatchLaterSchema);

module.exports = { WatchLater };