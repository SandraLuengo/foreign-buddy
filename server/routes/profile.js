const express = require("express");
const profileRouter = express.Router();
const Buddy = require("../models/Buddy");
const User = require("../models/User");
const parser = require("../configs/cloudinary");
const {findBuddy} = require('../utils/profileFunctions');



profileRouter.post("/upload_photo", parser.single("picture"), (req, res) => {

  console.log(req.body.user)
  let model = req.body.user.rol === "user" ? User : Buddy;

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

  let model = req.body.user.rol === "user" ? User : Buddy;

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
      if (model === User) {
        findBuddy(req.body.user, res)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error updating user profile'
      })
    })


});

profileRouter.post("/editInterests", (req, res, next) => {

  let model = req.body.user.rol === "user" ? User : Buddy;

  model.findOneAndUpdate({
      _id: req.body.user._id
    }, {
      $set: {
        interests: req.body.interests
      }
    })
    .then(() => {
      if (model === User) {
        findBuddy(req.body.user, res)
          .then(user => res.status(200).json(user))
          .catch(err => res.status(500).json({
            message: 'Error creating buddies array'
          }))
      }
    })
    .catch(err => res.status(500).json({
      message: err
    }));
});


module.exports = profileRouter;