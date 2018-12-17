const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const museosSchema = new Schema({
  name:String,
  type:{
      type:String,
      enum:['Modern','Classic','Alternative']
  },
  address:String,
  city:String

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Museos = mongoose.model('Museos', museosSchema);
module.exports = Museos;