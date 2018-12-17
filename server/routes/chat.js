const express = require('express');
const chatRouter = express.Router();
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");
const Buddy = require("../models/Buddy");


var buddiesArray = [];

chatRouter.post("/getMessages", (req, res) => {

    let chat_Id = req.body.id_chat;
    //, null,{ limit: 10 }
    Message.find({
            chat_Id
        })
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(err => res.status(500).json({
            message: 'Error in the authentication',
        }))

});


chatRouter.post("/createChatRoom", (req, res) => {
    const {
        mainUser,
        invitedUser
    } = req.body;
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
                console.log('abrimos chat');
                res.status(200).json({
                    chat
                });
                return;
            } else {
                console.log('Creamos un nuevo chat');
                let myChat = new Chat({
                    mainUser,
                    invitedUser
                });
                return myChat.save()
                    .then(chat => {
                        res.status(200).json({
                            chat
                        });
                    })
                    .catch(err => {
                        console.log('error al crear chat');
                    })
            }
        })
        .catch(err => {
            console.log('error al buscar chat');
        })


})



chatRouter.post("/getChatUsers", (req, res) => {
    //   console.log(req.body.user)
    //   findUsers(req.body.user)
    //     .then(buddies => {
    //       res.status(200).json(buddies)
    //     })
    if (req.body.user.rol == 'user') {
        User.findById(req.body.user._id)
            .then(userData => {
                buddiesArray = [];
                userData.buddies.forEach(item => {
                    console.log(item)
                    if (item.state == true) {
                        Buddy.findById(item.id)
                            .then(buddy => {
                                buddiesArray.push(buddy)
                            })
                    }
                })
                console.log(buddiesArray)
            })
        
        res.status(200).json(buddiesArray)
    } else {
        Buddy.findById(req.body.user._id)
            .then(userData => {
                buddiesArray = [];
                userData.users.forEach(item => {
                    if (item.state == true) {
                        User.findById(item.id)
                            .then(user => {
                                buddiesArray.push(user)
                            })
                    }
                })
            })
        res.status(200).json(buddiesArray)

    }

});



// function findUsers(newUser) {

//     if (newUser.rol == 'user') {
//       return Buddy.find({
//           rol: "buddy",
//           buddy_city: newUser.destination_city,
//           spoken_languages: {
//             $in: newUser.spoken_languages
//           }
//         })
//         .then(buddies => {
//           return buddies;
//         })
//         .catch(err => {
//           console.log("ERROR finding buddies!");
//           return "";
//         });
//     } else {

//       return User.find({
//           rol: "user",
//           destination_city: newUser.buddy_city,
//           spoken_languages: {
//             $in: newUser.spoken_languages
//           }
//         })
//         .then(users => {
//           console.log(users)
//           return users;
//         })
//         .catch(err => {
//           console.log("ERROR finding users!");
//           return "";
//         });
//     }

//   }


module.exports = chatRouter;