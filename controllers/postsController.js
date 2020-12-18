const express = require('express')
const postsController = express.Router()
const Post = require('../models/posts.js')
const multer = require('multer')
const path = require('path')
const storage = multer.memoryStorage()


const upload = multer({
    storage: storage,
    //limits
    limits: {
        fileSize: 1024 * 1024 * 5
        }
})


// Check File Type
// function checkFileType(file, cb) {
//     // Allowed file types
//     const filetypes = /jpeg|jpg|png|gif/
//     // check to see if upload matches 
//     const mimetype = filetypes.test(file.mimetype)

//     if (mimetype == filetypes) {
//         return cb(null, true)
//     } else {
//         cb('Images Only!')
//     }
// }  

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }


postsController.get('/new', (req, res) => {
    
    res.render('./posts/new.ejs', { currentUser: req.session.currentUser })
})


postsController.post('/', upload.single('postPhoto'), (req, res) => {

   const createdPost = {
       artistName: req.body.artistName,
       postPhoto: req.file.buffer,
       website: req.body.website,
       compTitle: req.body.compTitle,
       compDescription: req.body.compDescription,
       tags: req.body.tags
   }
        Post.create(createdPost, (err, createdPost) => {
        if(err) {
            res.render('./posts/new.ejs', {
                msg: err
            })
        } else {
            res.redirect('/posts')
        }
    })
})


postsController.get('/', isAuthenticated, (req, res) => {
    
    Post.find({}, (err, allPosts) => {
        
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







postsController.get('/:id', isAuthenticated, (req, res) => {
    
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

postsController.get('/:id/edit', (req, res) => {
    Post.findById(req.params.id).then(editPost => {
        res.render('./posts/edit.ejs', {
            edit: editPost,
            currentUser: req.session.currentUser
        })
    }).catch(err => console.log(err))
})


postsController.put('/:id', isAuthenticated, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
        if(err) {
            res.send(err)
        } else {
        res.redirect(`/posts/${updatedPost.id}`)
        }
    })
})



module.exports = postsController