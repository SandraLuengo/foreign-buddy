const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author_Id: String,
  chat_Id: String,
  message: String

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;