const express = require('express')
const postsRouter = express.Router()
const Post = require('../models/posts.js')

// **** ROUTES ****

// NEW route

postsRouter.get('/new', (req, res) => {
    console.log('new route running')
    res.render('./posts/new.ejs')
})

// CREATE route

postsRouter.post('/new', (req, res) => {
console.log('create route running')
res.send('hello CREATE route')
})

// INDEX route

postsRouter.get('/', (req, res) => {
    console.log('index route running')
    res.render('./posts/index.ejs')
})

// SHOW route

postsRouter.get('/:id', (req, res) => {
    console.log('show route running')
    res.send('Show me the route')
})



module.exports = postsRouter