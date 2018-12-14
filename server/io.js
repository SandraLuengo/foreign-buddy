require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/Message');


module.exports = (io) => {
  console.log('1.SERVIDOR')

  io.on('connection', (socket) => {
    console.log(`A user connected with id: ${socket.id}`);
    socket.on('message', (data) => {
      //console.log(data)
      messageStorage(data)
      socket.broadcast.emit(data.chat_id, data);
    });
  });
};

function messageStorage(data) {
  console.log(data)
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
  msg = data.msg;
  chat_id = data.chat_id
  console.log(msg, chat_id)
  let newMessage = new Message();

}