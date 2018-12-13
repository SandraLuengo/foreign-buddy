const express = require('express');
const chatRouter = express.Router();
const Message = require("../models/Message");

chatRouter.get("/getMessages", (req, res) => {
    const {
        id_chat
    } = req.body;
    Message.find({
            id_chat
        })
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(err => res.status(500).json({
            message: 'Error in the authentication',
        }))

});

module.exports = chatRouter;