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

  let mode='';
  let spoken_languages = [req.body.language1, req.body.language2];
  (req.body.user.rol == "user") ? model = User : model = Buddy;
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
        findBuddy(req.body.user,res)
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
        findBuddy(req.body.user, res)
          .then(user => {
            res.status(200).json(user)})
          .catch(err => {
            console.log(1)
            res.status(500).json({
              message: 'Error creating buddies array',
            })
          })
      }

    })
    .catch(err => console.log(2))
});

//Rellenamos el array de buddies, que luego se consultara desde buddies

//Esto vale para users pero no para buddies


const findBuddy = (newUser, res) => {

  console.log(res)

  if (newUser.rol == 'user' && newUser.buddy_gender != '' && newUser.interests.length > 0 && newUser.buddies.length == 0) {
    return Buddy.find({
        buddy_city: newUser.destination_city,
        spoken_languages: {
          $in: newUser.spoken_languages
        }
      })
      .then(buddies => {
        let buddiesArray = [];
        buddies.forEach(buddy => {
          buddiesArray.push({
            id: buddy._id,
            state: false
          })
        })
        User.findByIdAndUpdate({
            _id: newUser._id
          }, {
            buddies: buddiesArray
          })
          .then(user => {
            res.status(200).json(user)
          })
          .catch(err => console.log('pppppppp'))
      })
      .catch(err => {
        console.log(3)
        res.status(500).json({
          message: 'Error creating buddies array',
        })
      });
  }else{
    res.status(200).json(newUser)
  }

}


module.exports = profileRouter;