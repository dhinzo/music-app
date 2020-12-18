const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    artistName: { type: String, unique: true, required: true },
    realName: String,
    password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

module.exports = User