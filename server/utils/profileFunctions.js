const Buddy = require("../models/Buddy");
const User = require("../models/User");

const buddyFunction = (newUser, res) => {
    return Buddy.find({
            buddy_city: newUser.destination_city,
            spoken_languages: {
                $in: newUser.spoken_languages
            }
        }).limit(10)
        .then(buddies => {
            let buddiesArray = [];
            buddies.forEach(buddy => {
                buddiesArray.push({
                    id: buddy._id,
                    state: false
                })
            })
            return User.findByIdAndUpdate({
                _id: newUser._id
            }, {
                buddies: buddiesArray
            })
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            message: 'Error creating buddies array'
        }));
}


    function findBuddy(newUser, res) {

        if (newUser.rol === 'user' && newUser.buddy_gender !== '' && newUser.interests.length > 0 && newUser.buddies.length === 0) {
            buddyFunction(newUser, res)
        } else {
            res.status(200).json(newUser)
        }

    }
    
    module.exports = {findBuddy}; 