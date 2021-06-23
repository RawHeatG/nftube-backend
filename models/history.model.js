const mongoose = require('mongoose');
const { Schema } = mongoose;

const HistorySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
});

const History = mongoose.model('History', HistorySchema);

module.exports = { History };