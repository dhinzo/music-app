const bcrypt = require('bcrypt')
const express = require('express')
const usersController = express.Router()
const User = require('../models/users')

usersController.get('/new', (req, res) => {
    res.render('users/new.ejs', { currentUser: req.session.currentUser })
})

usersController.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    User.create(req.body, (err, createdUser) => {
        if(err) {
            console.log(err)
            res.redirect('/users/new')
        } else {
            console.log('user created! welcome, ', createdUser)
            res.redirect('/posts')
        }
    })
})

module.exports = usersController