const express = require('express');
const buddiesRouter = express.Router();
const User = require("../models/User");
const Buddy = require("../models/Buddy");

//Exactamente igual que hacer un loggedin 

buddiesRouter.get("/getAll", (req, res) => {
    const {
        id,
        rol
    } = req.body;
    if (rol == 'user') {
        User.findById({
                id
            })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({
                message: 'Error in the authentication',
            }))
    } else {
        Buddy.findById({
                id
            })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({
                message: 'Error in the authentication',
            }))
    }
});

buddiesRouter.get("/getAllProfesional", (req, res) => {

    User.find({
            professional: true
        })
        .then(professionalBuddies => res.status(200).json(professionalBuddies))
        .catch(err => res.status(500).json({
            message: 'Error in the authentication',
        }))
});

module.exports = chatRouter;