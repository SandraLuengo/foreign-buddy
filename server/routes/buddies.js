const express = require('express');
const buddiesRouter = express.Router();
const User = require("../models/User");
const Buddy = require("../models/Buddy");


buddiesRouter.get("/getAllProfesional", (req, res) => {

  User.find({
      professional: true
    })
    .then(professionalBuddies => res.status(200).json(professionalBuddies))
    .catch(err => res.status(500).json({
      message: 'Error in the authentication',
    }))

});


buddiesRouter.post("/getBuddies", (req, res) => {
  
  if(req.body.user.rol==='user'){
    User.findById(req.body.user._id)
      .then(userData => {
        console.log(userData)
        return userData.buddies.filter(item => item.state === false)
      })
      .then((item) => {
        let arr = item.map((item) => Buddy.findById(item.id));
        return Promise.all(arr).then(res => res)
      })
      .then((buddiesArray) => res.status(200).json(buddiesArray))
  } else {
    res.status(200).json(req.body.user)
  }
})

buddiesRouter.post("/addNewBuddy", (req, res) => {

  if (req.body.currentUser.rol === 'user') {
    User.findByIdAndUpdate({
        _id: req.body.currentUser._id

      })
      .then(addedBuddy => {
        addedBuddy.buddies.forEach(item => {
          if (item.id == req.body.id) {
             Object.assign(item.state, item.state = true);
          }
        })
        return User.findByIdAndUpdate({
          _id: req.body.currentUser._id
        }, {
          $set: {
            buddies: addedBuddy.buddies
          }
        })
      })
      .then((userUpdated) => {

        return Buddy.findByIdAndUpdate({
          _id: req.body.id
        }, {
          $push: {
            users: {
              id: req.body.currentUser._id,
              state: true
            }
          }
        }).then(()=>userUpdated)
      })
      .then(item=>res.status(200).json(item))
      .catch(err => res.status(500).json({
        message: 'Error adding buddy',
      }))
  }
})


module.exports = buddiesRouter;