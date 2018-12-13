const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const Buddy          = require('../models/Buddy');
const bcrypt        = require('bcrypt');

passport.use('user',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    console.log('USER STRATEGY');
    User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect email' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));



passport.use('buddy',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
(email, password, done) => {
  console.log('BUDDY STRATEGY');
  console.log(email)
  Buddy.findOne({ email })
  .then(foundUser => {
    if (!foundUser) {
      console.log('NO se ha encontrado usuario')
      done(null, false, { message: 'Incorrect email' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      console.log('contraseña incorrecta')
      done(null, false, { message: 'Incorrect password' });
      return;
    }

    done(null, foundUser);
  })
  .catch(err => done(err));
}
));
