const express = require('express');
const buddiesRouter = express.Router();
const User = require("../models/User");
const Buddy = require("../models/Buddy");

//Exactamente igual que hacer un loggedin 

buddiesRouter.get("/getAllProfesional", (req, res) => {

  User.find({
      professional: true
    })
    .then(professionalBuddies => res.status(200).json(professionalBuddies))
    .catch(err => res.status(500).json({
      message: 'Error in the authentication',
    }))
});


//Ñapa solo para probar el chat

buddiesRouter.post("/getChatUsers", (req, res) => {
  findUsers(req.body.user)
    .then(buddies => {
      res.status(200).json(buddies)
    })
});


function findUsers(newUser) {

  if (newUser.rol == 'user') {
    return Buddy.find({
        rol: "buddy",
        buddy_city: newUser.destination_city,
        spoken_languages: {
          $in: newUser.spoken_languages
        }
      })
      .then(buddies => {
        return buddies;
      })
      .catch(err => {
        console.log("ERROR finding buddies!");
        return "";
      });
  } else {
    
    return User.find({
        rol: "user",
        destination_city: newUser.buddy_city,
        spoken_languages: {
          $in: newUser.spoken_languages
        }
      })
      .then(users => {
        console.log(users)
        return users;
      })
      .catch(err => {
        console.log("ERROR finding users!");
        return "";
      });
  }

}


module.exports = buddiesRouter;