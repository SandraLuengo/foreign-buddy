require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/Message');


module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', (data) => {
      messageStorage(data)
        .then(allMsg => {
          socket.broadcast.emit(data.chat_id, allMsg);
        })


    });
  });
};




function messageStorage(data) {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true
    })
    .then((x) => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err);
    });
  message = data.msg;
  chat_Id = data.chat_id;
  author_Id = data.mainUser;
  let newMessage = new Message({
    author_Id,
    chat_Id,
    message
  });
  return newMessage.save()
    .then(() => {
      return Message.find({
          chat_Id
        })
        .then(allMessages => {
          return allMessages;
        })
    })
    .catch(err => {
      console.log(`error al crear un nuevo mensaje ${err}`)
    })

}