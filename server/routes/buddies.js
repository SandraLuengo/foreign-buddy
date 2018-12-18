const express = require('express');
const buddiesRouter = express.Router();
const User = require("../models/User");
const Buddy = require("../models/Buddy");


var buddiesArray = [];

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
 console.log(req.body.user)
  User.findById(req.body.user._id)
    .then(userData => {
      buddiesArray = [];
      userData.buddies.forEach(item => {
        if (item.state == false) {
          console.log('ENTROOOOOOOO'+item.id)
          Buddy.findById(item.id)
            .then(buddy => {
              buddiesArray.push(buddy)
            })
        }
      })
    })
  res.status(200).json(buddiesArray)
})

buddiesRouter.post("/addNewBuddy", (req, res) => {


  if (req.body.currentUser.rol == 'user') {
    User.findByIdAndUpdate({
        _id: req.body.currentUser._id

      })
      .then(addedBuddy => {

        addedBuddy.buddies.map(item => {
          if (item.id == req.body.id) {
            return Object.assign(item.state, item.state = true);
          }
        })
        User.findByIdAndUpdate({
            _id: req.body.currentUser._id
          }, {
            $set: {
              buddies: addedBuddy.buddies
            }
          })
          .then(user => {
            
            Buddy.findByIdAndUpdate({
                _id: req.body.id
              }, {
                $push: {
                  users: {
                    id: req.body.currentUser._id,
                    state: true
                  }
                }
              })
              .catch(err => res.status(500).json({
                message: 'Error adding user',
              }))
              .catch(err => res.status(500).json({
                message: 'Error adding buddy',
              }))
          })
          res.status(200).json(addedBuddy)
      })
      .catch(err => res.status(500).json({
        message: 'Error adding buddy',
      }))
      
  }
})


module.exports = buddiesRouter;