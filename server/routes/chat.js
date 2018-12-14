const express = require('express');
const chatRouter = express.Router();
const Message = require("../models/Message");
const Chat = require("../models/Chat");

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


chatRouter.post("/createChatRoom",(req,res)=>{
    const{mainUser,invitedUser}=req.body;
    // myChat = new Chat({mainUser,invitedUser})
    // myChat.save()
    // .then(newChat=>res.status(200).json(newChat))
    // .catch(err=>res.status(500).json(err))

     Chat.find({$or: [{ mainUser: mainUser, invitedUser: invitedUser }, { mainUser: invitedUser, invitedUser: mainUser }]})
    .then(chat => {
      if (chat.length > 0) {
        console.log('abrimos chat');
         res.status(200).json({ chat });
         return;
      } else {
        console.log('Creamos un nuevo chat');
        let myChat = new Chat({ mainUser, invitedUser });
        return myChat.save()
          .then(chat => {
             res.status(200).json({chat});
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


module.exports = chatRouter;