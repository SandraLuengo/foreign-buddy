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

  User.findById(req.body.user._id)
    .then(userData => {
      buddiesArray = [];
      userData.buddies.forEach(item => {
        if (item.state == false) {
          Buddy.findById(item.id)
            .then(buddy => {
              buddiesArray.push(buddy)
            })
        }
      })
    })
  res.status(200).json(buddiesArray)
  console.log(buddiesArray)
})

buddiesRouter.post("/addNewBuddy", (req, res) => {
  console.log(req.body.id)
  console.log(req.body.currentUser)
  if (req.body.currentUser.rol == 'user') {
    User.findByIdAndUpdate({
        _id: req.body.currentUser._id
      }, {
        $set: {
          buddies: {
            id: req.body.id,
            state: true
          }
        }
      })
      .then(addedBuddy => res.status(200).json(addedBuddy))
      .catch(err => res.status(500).json({
        message: 'Error adding buddy',
      }))
  } else {
    Buddy.findByIdAndUpdate({
        _id: req.body.id
      }, {
        $push: {
          users: {
            id: req.body.currentUser._id,
            state: false
          }
        }
      })
      .then(addedUser => res.status(200).json(addedUser))
      .catch(err => res.status(500).json({
        message: 'Error adding user',
      }))
  }
})

buddiesRouter.post("/deleteBuddy", (req, res) => {
  // console.log(req.body.id)
  // console.log(req.body.currentUser)
  // if(req.body.currentUser.rol=='user'){
  //   User.findByIdAndUpdate({_id:req.body.currentUser._id},{$push:{buddies:req.body.id}})
  //   .then(addedBuddy=> res.status(200).json(addedBuddy))
  //   .catch(err =>  res.status(500).json({
  //     message: 'Error adding buddy',
  //   }))
  // }else{
  //   Buddy.findByIdAndUpdate({_id:req.body.id},{$push:{users:req.body.currentUser._id}})
  //   .then(addedUser=> res.status(200).json(addedUser))
  //   .catch(err =>  res.status(500).json({
  //     message: 'Error adding user',
  //   }))
  // }
})

// function findUsers(newUser) {

//   if (newUser.rol == 'user') {
//     return Buddy.find({
//         rol: "buddy",
//         buddy_city: newUser.destination_city,
//         spoken_languages: {
//           $in: newUser.spoken_languages
//         }
//       })
//       .then(buddies => {
//         return buddies;
//       })
//       .catch(err => {
//         console.log("ERROR finding buddies!");
//         return "";
//       });
//   } else {

//     return User.find({
//         rol: "user",
//         destination_city: newUser.buddy_city,
//         spoken_languages: {
//           $in: newUser.spoken_languages
//         }
//       })
//       .then(users => {
//         console.log(users)
//         return users;
//       })
//       .catch(err => {
//         console.log("ERROR finding users!");
//         return "";
//       });
//   }

// }


module.exports = buddiesRouter;