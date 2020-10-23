const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    artistName: { type: String, required: true},
    postPhoto: String,
    compTitle: { type: String, required: true },
    compDescription: { type: String, required: true },
    songFile: { type: String },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post