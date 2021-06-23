const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({
    videoId: String,
    title:String,
    uploadedBy: String,
    description:String,
    likes: String,
    views: String,
    subscribers: String,
});

const Video = mongoose.model("Video", VideoSchema)

module.exports = { Video };