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

buddiesRouter.post("/getMybuddies", (req, res) => {

    findBuddy(req.body.user)
    .then(buddies=>{
        res.status(200).json(buddies)
    })
});


function findBuddy(newUser) {
    console.log('--------------------------------------')
    console.log(newUser.destination_city)
    return Buddy.find({
      rol: "buddy",
      buddy_city: newUser.destination_city,
      spoken_languages: {
        $in: newUser.spoken_languages
      }
    })
      .then(buddies => {
        console.log(buddies)
        return buddies;
      })
      .catch(err => {
        console.log("ERROR!");
        return "";
      });
  }


module.exports = buddiesRouter;