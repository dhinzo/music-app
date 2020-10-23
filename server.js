// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Post = require('./models/posts.js')
// const PORT = 3000
const methodOverride = require('method-override')

// env variables
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// Middleware
app.use(express.urlencoded({ extended: true }))

// sends DELETE requests
app.use(methodOverride('_method'))

// STATIC
app.use(express.static('public'))

// Mongoose Connection Code
mongoose.connect(mongodbURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("the connection with mongod is established")
  }
)

// Post.create({
//   artistName: 'Baethoven',
//   postPhoto: 'https://www.biography.com/.image/t_share/MTI2NTgyMzIxOTcyMjU5NDU5/beethoven-600x600jpg.jpg',
//   compTitle: 'Symphony no. 9, mvt: II',
//   compDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   tags: '#inone, #slaythoven, #okstrings, #okoboes, #bringitbackbrass'
// }).then(post => console.log(post)).catch(err => console.log(err))


// CONTROLLERS

// Posts Controller
const postsController = require('./controllers/postsRouter.js')
app.use('/posts', postsController) 


// LISTENER
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

