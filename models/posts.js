const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    artistName: String,
    postPhoto: Buffer,
    compTitle: String,
    compDescription: String,
    tags: [String],
    website: String,
    //songFile: { type: String },
    //likes: { type: Number, default: 0 }
}, {timestamp: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post