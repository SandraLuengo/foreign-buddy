const express = require("express");
const profileRouter = express.Router();
const parser = require("../configs/cloudinary");
const Buddy = require("../models/Buddy");
const User = require("../models/User");

profileRouter.post("/upload_photo", parser.single("image"), (req, res) => {
  //ROL ID IMAGEN
  let model = "";
  if (req.body.rol == "user") {
    model = User;
  } else {
    model = Buddy;
  }
  model
    .findOneAndUpdate(
      {
        _id: req.body.id
      },
      {
        image: req.file.url
      }
    )
    .then(() => {
      res.json({
        success: true,
        image: req.file.url
      });
    })
    .catch(err => console.log(err));
});

profileRouter.post("/editDescription", (req, res, next) => {
  const { id, rol, description } = req.body;
  let model = "";
  if (rol == "user") {
    model = User;
  } else {
    model = Buddy;
  }
  model
    .findOneAndUpdate(
      {
        _id: id
      },
      {
        description
      }
    )
    .then(() => {
      res.json({
        success: true,
        description
      });
    })
    .catch(err => console.log(err));
});

profileRouter.post("/editInterests", (req, res, next) => {
  console.log(req.body.interests)
  console.log(req.body.user._id)
  console.log(req.body.user.rol)
  //actualizar user con sus intereses
  //generar buddies

  // Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
  //   if (err) return handleError(err);
  //   res.send(tank);
  // });

});

profileRouter.post("/editBasic", (req, res, next) => {
  if (req.body.rol == "user") {
    const {
      id,
      rol,
      username,
      email,
      password,
      destination_country,
      destination_city,
      origin_country
    } = req.body;
    User.updateMany(
      {
        _id: id
      },
      {
        username,
        email,
        password,
        destination_country,
        destination_city,
        origin_country
      }
    )
      .then(() => {
        res.json({
          success: true,
          username,
          email,
          password,
          destination_country,
          destination_city,
          origin_country
        });
      })
      .catch(err => console.log(err));
  } else {
    const {
      id,
      rol,
      username,
      email,
      password,
      buddy_city,
      buddy_country
    } = req.body;
    Buddy.updateMany(
      {
        _id: id
      },
      {
        username,
        email,
        password,
        buddy_city,
        buddy_country
      }
    )
      .then(() => {
        res.json({
          success: true,
          username,
          email,
          password,
          buddy_city,
          buddy_country
        });
      })
      .catch(err => console.log(err));
  }
});

function findBuddy(newUser) {
  return User.find({
    rol: "buddy",
    destination_city: newUser.destination_city,
    spoken_languages: {
      $in: newUser.spoken_languages
    }
  })
    .then(buddies => {
      //console.log(buddies + 'buddies encontrados')
      if (buddies.length > 10) {
        User.find({
          rol: "buddy",
          destination_city: newUser.destination_city,
          spoken_languages: {
            $in: newUser.spoken_languages
          }
        }).then(buddies=> buddies)
      }
      return buddies;
    })
    .catch(err => {
      console.log("ERROR!");
      return "";
    });
}

module.exports = profileRouter;
