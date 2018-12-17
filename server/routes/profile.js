const express = require("express");
const profileRouter = express.Router();
const parser = require("../configs/cloudinary");
const Buddy = require("../models/Buddy");
const User = require("../models/User");

profileRouter.post("/upload_photo", parser.single("picture"), (req, res) => {

  let model = "";
  if (req.body.rol == "user") {
    model = User;
  } else {
    model = Buddy;
  }

  model
    .findOneAndUpdate({
      _id: req.body.id
    }, {
      image: req.file.url
    })
    .then(user => {
      res.json({
        success: true,
        image: req.file.url
      });
    })
    .catch(err => console.log(err));
});

profileRouter.post("/editProfileData", (req, res, next) => {

  let spoken_languages = [req.body.language1, req.body.language2];
  if (req.body.user.rol == "user") {
    model = User;
  } else {
    model = Buddy;
  }
  model.updateMany({
      _id: req.body.user._id
    }, {
      $set: {
        description: req.body.description,
        age: req.body.age,
        spoken_languages,
        buddy_gender: req.body.buddy_gender
      }
    })
    .then(user => {
      if (model == User) {
        findBuddy(req.body.user)
          // .then(() => res.status(200).json(user))
          // .catch(err => res.status(500).json({
          //   message: 'Error creating buddies array',
          // }))
      }
    })
    .catch(err => console.log(err))


});

profileRouter.post("/editInterests", (req, res, next) => {

  if (req.body.user.rol == "user") {
    model = User;
  } else {
    model = Buddy;
  }
  model.findOneAndUpdate({
      _id: req.body.user._id
    }, {
      $set: {
        interests: req.body.interests
      }
    })
    .then(() => {
      if (model == User) {
        findBuddy(req.body.user,res)
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log(err)
            res.status(500).json({
            message: 'Error creating buddies array',
          })})
      }

    })
    .catch(err => console.log(err))
});

//Rellenamos el array de buddies, que luego se consultara desde buddies

//Esto vale para users pero no para buddies


function findBuddy(newUser,res) {

  if (newUser.rol=='user' && newUser.buddy_gender != '' && newUser.interests.length > 0 && newUser.buddies.length == 0) {
    return Buddy.find({
        buddy_city: newUser.destination_city,
        spoken_languages: {
          $in: newUser.spoken_languages
        }
      })
      .then(buddies => {
        return generateBuddiesArray(newUser, buddies);
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error creating buddies array',
        })
      });
  }
  res.status(200).json(newUser)
}

function generateBuddiesArray(newUser, buddies) {

  let buddiesArray=[];

  if(buddies.length>3){
    let buddy=orderBuddiesArray(buddies)
    buddy.forEach(buddy=>{
      buddiesArray .push({id:buddy._id,state:false})
    })
  }else{
    buddies.forEach(buddy=>{
      buddiesArray .push({id:buddy._id,state:false})
    })
  } 
  console.log(buddiesArray)
  return User.findByIdAndUpdate({
    _id:newUser._id
  },{buddies:buddiesArray})
  .then(user=>{
    console.log(user)
    return user;
  })
}

function orderBuddiesArray(buddies){

}


module.exports = profileRouter;