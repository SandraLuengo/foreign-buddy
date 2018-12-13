const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatBootSchema = new Schema({
    mainUser: String,
    invitedUser: String,
    topics: Array

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const ChatBoot = mongoose.model('ChatBoot', chatBootSchema);
module.exports = ChatBoot;