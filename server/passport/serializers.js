const passport = require("passport");
const User = require("../models/User");
const Buddy = require("../models/Buddy");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser);
});

passport.deserializeUser((user, cb) => {

  if (user.rol == "user") {
    User.findById(user._id)
      .then(userDocument => {
        cb(null, userDocument);
      })
      .catch(err => {
        cb(err);
      });
  } else {
    Buddy.findById(user._id)
      .then(userDocument => {
        cb(null, userDocument);
      })
      .catch(err => {
        cb(err);
      });
  }
});
