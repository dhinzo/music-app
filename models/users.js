const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    artistName: { type: String },
    realName: String,
    password: String
})

const User = mongoose.model('User', userSchema)

module.exports = User