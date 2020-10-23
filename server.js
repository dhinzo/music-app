// Dependencies

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Post = require('./models/posts.js')
const PORT = 3000
// env variables
//const PORT = process.env.PORT
//const mongodbURI = process.env.MONGODBURI

app.use(express.urlencoded({ extended: true }))

// STATIC
app.use(express.static('public'))

// Mongoose Connection Code
mongoose.connect('mongodbURI', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("the connection with mongod is established")
  }
)




// CONTROLLERS

// Posts Controller
const postsController = require('./controllers/postsRouter.js')
app.use('/posts', postsController) 


// LISTENER
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

