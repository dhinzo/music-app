const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    artistName: { type: String, unique: true, required: true },
    realName: String,
    password: { type: String, required: true },
    // isComposer: Boolean,
    // isBoth: Boolean
})

const User = mongoose.model('User', userSchema)

module.exports = User