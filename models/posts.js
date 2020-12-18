const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    artistName: String,
    postPhoto: Buffer,
    compTitle: String,
    compDescription: String,
    tags: [String],
    website: String,
}, {timestamp: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post