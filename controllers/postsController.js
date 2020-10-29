const express = require('express')
const postsController = express.Router()
const Post = require('../models/posts.js')
const multer = require('multer')
const path = require('path')
const storage = multer.memoryStorage()


// Upload with Multer
const upload = multer({
    storage: storage,
    //limits
    limits: {
        fileSize: 1024 * 1024 * 5
        }
    // fileFilter: function(req, file, cb) {
    //     checkFileType(file, cb)
    // }
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
// **** ROUTES ****

// NEW route

postsController.get('/new', (req, res) => {
    console.log('new route running')
    res.render('./posts/new.ejs', { currentUser: req.session.currentUser })
})

// CREATE route

postsController.post('/', upload.single('postPhoto'), (req, res) => {
//    create object createdPost{artistName: req.body.artistName, postPhoto: {data: req.file.buffer, contentType: req.file.mimetype}, }
   const createdPost = {
       artistName: req.body.artistName,
       postPhoto: req.file.buffer,
       website: req.body.website,
       compTitle: req.body.compTitle,
       compDescription: req.body.compDescription,
       tags: req.body.tags
   }
    console.log('create route running')
        Post.create(createdPost, (err, createdPost) => {
        if(err) {
            res.render('./posts/new.ejs', {
                msg: err
            })
        } else {
            res.redirect('/posts')
        }
    })
    // upload(req, res, (err) => {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         console.log(req.file)
    //     }
    // })
})

// INDEX route

postsController.get('/', isAuthenticated, (req, res) => {
    console.log('index route running')
    Post.find({}, (err, allPosts) => {
        //console.log()
        if(err) {
            console.log(err)
        } else {
        res.render('./posts/index.ejs', {
        posts: allPosts,
        currentUser: req.session.currentUser
            })
            //console.log(req.session.currentUser)
        }
        //console.log(req.session.currentUser);
        
    })
})


// postsController.get('/seed', (req, res) => {
//     Post.create([
//         {
//             artistName: 'Nico Muhly' ,
//             postPhoto: 'https://classicalexburns.com/wp-content/uploads/2019/09/nico-muhly-1-sonar-bcn-2017.jpg',
//             compTitle: 'Viola Concerto',
//             compDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//             tags: ['#Viola', '#Concerto', '#Orchestra', '#Soloist'],
//             website: 'http://nicomuhly.com/',  
//     },
//         {
//             artistName: 'Jessie Montgomery' ,
//             postPhoto: 'https://images.squarespace-cdn.com/content/v1/557a1e87e4b0017a8ad98836/1565052247088-0C97Q2ZKB0T69K5SH08S/ke17ZwdGBToddI8pDm48kG3zKbvSeiyK83VonJw1vY4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcF2EyE_KmpxcZq4Kygad-sBpPsQDaTQWmRT6lsDAeVEGATlP9ZORxAehQBatWHMoU/portrait.jpg?format=2500w',
//             compTitle: 'Rhapsody No. 1 for solo violin',
//             compDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//             tags: ['#Violin', '#Solo', '#Improvisatory', '#Soloist'],
//             website: 'https://www.jessiemontgomery.com/',   
//     },
//     {
//             artistName: 'Baethoven',
//             postPhoto: 'https://www.gstatic.com/tv/thumb/persons/188667/188667_v9_ba.jpg',
//             compTitle: 'Symphony No. 9 in d minor',
//             compDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//             tags: ['#Orchestra', '#Famous', '#BOP', '#Soloist'],
//             website: 'https://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
//     }
//     ], (err, data)=>{
//         res.redirect('/posts');
//     })
// })






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
        if(err) {
            res.send(err)
        } else {
        res.redirect(`/posts/${updatedPost.id}`)
        }
    })
})



module.exports = postsController