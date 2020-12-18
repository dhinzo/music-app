const bcrypt = require('bcrypt')
const express = require('express')
const sessionsController = express.Router()
const User = require('../models/users.js')

sessionsController.get('/new', (req, res) => {
    res.render('sessions/login.ejs', { currentUser: req.session.currentUser })
})

// on sessions form submit (log in)
sessionsController.post('/', async (req, res) => {

  //Find the document for the user
  try{

    const user = await User.findOne({ artistName: req.body.artistName});
    try{

      const myUser = await User.findById(user._id)
      if (bcrypt.compareSync(req.body.password, myUser.password)) {       
        req.session.currentUser = myUser
        res.redirect('/posts')
      } else {
        console.log('bad pw')
        res.redirect('/sessions/new')
      }
    }
    catch (err) {
      res.send('Invalid User')
    }     
  }
  catch (err) {

  }

})
  





    
    // username is found and password matches
    // successful log in
  
    // username is not found - who cares about password if you don't have a username that is found?
    // unsuccessful login
  
    // username found but password doesn't match
    // unsuccessful login
  
    // some weird thing happened???????
  
    // Step 1 Look for the username
    



  //   User.findById({ artistName: req.body.artistName }, (err, foundUser) => {
  //     // Database error

  //     if (err) {
  //       console.log(err)
  //       res.send('Uh oh! A problem on our end. Try again later.')
  //     } else if (!foundUser) {
  //       // if found user is undefined/null not found etc
  //       res.send('<a  href="/">Sorry, no user found </a>')
  //     } else {
  //       // user is found yay!
  //       // now let's check if passwords match
        
  //       } else {
  //         // passwords do not match
  //         res.send('<a href="/"> password does not match </a>')
  //       }
  //     }
  //   })
  // })}
  
  sessionsController.delete('/', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/')
    })
  })
  
  module.exports = sessionsController