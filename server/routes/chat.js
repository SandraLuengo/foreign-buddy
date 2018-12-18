const express = require('express');
const chatRouter = express.Router();
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");
const Buddy = require("../models/Buddy");


let buddiesArray = [];

chatRouter.post("/getMessages", (req, res) => {

    Message.find({
            chat_Id:req.body.id_chat
        })
        .then(messages => {res.status(200).json(messages)})
        .catch(err => res.status(500).json({message: 'Error in the authentication',}))

});


chatRouter.post("/createChatRoom", (req, res) => {

    const { mainUser, invitedUser } = req.body;

    Chat.find({
            $or: [{
                mainUser: mainUser,
                invitedUser: invitedUser
            }, {
                mainUser: invitedUser,
                invitedUser: mainUser
            }]
        })
        .then(chat => {

            if (chat.length > 0) {
                return res.status(200).json({ chat });
            } else {
                let myChat = new Chat({ mainUser, invitedUser });
                return myChat.save()
                    .then(chat => {res.status(200).json({chat});
                    })
                    .catch(err => res.status(500).json({message: 'Error in the authentication',}))
            }
        })
        .catch(err => res.status(500).json({message: 'Error in the authentication',}))
})


chatRouter.post("/getChatUsers", (req, res) => {

    let model = req.body.user.rol === "user" ? User : Buddy;
    let opositeModel = req.body.user.rol === "user" ? Buddy : User ;
    let userRol = req.body.user.rol === "user" ? 'buddies' : 'users';

    model.findById(req.body.user._id)
    .then(userData => {
        return userData[userRol].filter(item => (item.state === true))
    })
    .then((item)=> {
        let arr = item.map((item)=> opositeModel.findById(item.id));
        return Promise.all(arr).then(res=>res)
    })
    .then((buddiesArray)=>{console.log(buddiesArray); res.status(200).json(buddiesArray)})   
    });


module.exports = chatRouter;
