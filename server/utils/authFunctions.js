const User = require("../models/User");
const Buddy = require("../models/Buddy");

function getRol(email) {

    return User.find({
            email
        })
        .then(user => user.length <= 0 ? Buddy.find({
            email
        }) : 'user')
        .then(role => role === 'user' ? 'user' : 'buddy')
        .catch(err => console.log(`error al buscar user en login ${err}`))

}

module.exports = { getRol };