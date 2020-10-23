const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    artistName: { type: String, required: true},
    postPhoto: String,
    compTitle: { type: String, required: true },
    compDescription: { type: String, required: true },
    tags: [String],
    songFile: { type: String },
    likes: { type: Number, default: 0 }
}, {timestamp: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post