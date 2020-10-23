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

postsRouter.post('/', (req, res) => {
    console.log('create route running')
        Post.create(req.body, (err, createdPost) => {
        res.redirect('/posts')
    })
})

// INDEX route

postsRouter.get('/', (req, res) => {
    console.log('index route running')
    Post.find({}, (err, allPosts) => {
        console.log()
        if(err) {
            console.log(err)
        } else {
        res.render('./posts/index.ejs', {
        posts: allPosts
            })
        }
    })
})

// SHOW route

postsRouter.get('/:id', (req, res) => {
    console.log('show route running')
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.log(err)
        } else {
            res.render('./posts/show.ejs', {
                post: foundPost
            })
        }
    })
})



module.exports = postsRouter