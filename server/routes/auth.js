const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const Buddy = require("../models/Buddy");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const { getRol } = require('../utils/authFunctions');

authRoutes.post('/login', (req, res, next) => {
// var rol='';

// User.find(mail)-->ok rol='user';
// POrofesrional.find(mail)->rol='profesional'
// si no --> usuairio no registrafdo


  getRol(req.body.email)
    .then(rol => {
      passport.authenticate(rol, (err, user, failureDetails) => {
        if (err) {
          res.status(500).json({
            message: 'Error in the authentication',
          });
          return;
        }
        if (!user) {
          res.status(500).json(failureDetails);
          return;
        }

        req.login(user, (error) => {
          if (error) {
            res.status(500).json({
              message: 'Error in the authentication',
            });
            return;
          }
          res.status(200).json(
            user
          );
        });
      })(req, res, next);
    })
    .catch(err => console.log(err))
});

authRoutes.post('/signup', (req, res) => {
  var userData = {};
  var modelName = '';

  for (const prop in req.body.state) {
    if (req.body.state.rol == 'user') {
      (prop !== 'buddy_city' && prop !== 'buddy_country') ? userData[prop] = req.body.state[prop]: modelName = User;
    } else {
      (prop != 'destination_city' && prop != 'destination_country' && prop != 'origin_country') ? userData[prop] = req.body.state[prop]: modelName = Buddy;
    }
  }

  let emptyElemnts = Object.keys(userData).map(prop => {
    return (prop === '' && prop !== 'image' && prop !== 'interests' && prop !== 'description')
  });

  if (emptyElemnts.includes(true)) {
    res.status(500).json({
      message: 'Algun campo esta vacio',
    });
    return;
  }

  modelName.findOne({
    'username': userData.username,
  }, (err, user) => {
    if (user !== null) {
      res.status(500).json({
        message: 'Username taken',
      });
      return;
    }

    let age = `${userData.day}-${userData.month}-${userData.year}`
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(userData.password, salt);
    const newUserData = Object.assign(userData, {
      password: hashPass,
      age: age
    });
    const newUser = new modelName(newUserData);

    newUser.save((er) => {
      if (er) {
        res.status(500).json({
          message: 'Saving user to database went wrong.',
        });
      } else {
        req.login(newUser, (e) => {
          if (e) {
            res.status(500).json({
              message: 'Login after signup went bad.',
            });
            return;
          }
          res.status(200).json(
            newUser
          );
        });
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'Log out success!',
  });
});

authRoutes.get('/loggedin', (req, res) => {
  
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({
    message: 'Unauthorized',
  });
});

module.exports = authRoutes;