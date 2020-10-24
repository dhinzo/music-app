const express = require('express')
const postsController = express.Router()
const Post = require('../models/posts.js')


const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }
// **** ROUTES ****

// NEW route

postsController.get('/new', (req, res) => {
    console.log('new route running')
    res.render('./posts/new.ejs', { currentUser: req.session.currentUser })
})

// CREATE route

postsController.post('/', (req, res) => {
    console.log('create route running')
        Post.create(req.body, (err, createdPost) => {
        res.redirect('/posts')
    })
})

// INDEX route

postsController.get('/', (req, res) => {
    console.log('index route running')
    Post.find({}, (err, allPosts) => {
        console.log()
        if(err) {
            console.log(err)
        } else {
        res.render('./posts/index.ejs', {
        posts: allPosts,
        currentUser: req.session.currentUser
            })
        }
    })
})

// SHOW route

postsController.get('/:id', isAuthenticated, (req, res) => {
    console.log('show route running')
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.log(err)
        } else {
            res.render('./posts/show.ejs', {
                post: foundPost,
                currentUser: req.session.currentUser
            })
        }
    })
})

// DELETE route

postsController.delete('/:id', isAuthenticated, (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, data) => {
        if(err){
            console.log(err)
        } else {
            console.log('deleted', data)
            res.redirect('/posts')
        }
    })
})


// EDIT route

postsController.get('/:id/edit', (req, res) => {
    Post.findById(req.params.id).then(editPost => {
        res.render('./posts/edit.ejs', {
            edit: editPost,
            currentUser: req.session.currentUser
        })
    }).catch(err => console.log(err))
})

// UPDATE route

postsController.put('/:id', isAuthenticated, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
        res.redirect(`/posts/${updatedPost.id}`)
    })
})



module.exports = postsController