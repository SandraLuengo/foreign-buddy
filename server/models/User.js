const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Modelos de paises, ciudades e idiomas, usuario con el id de esos modelos

const userSchema = new Schema({
  username:String,
  surname:String,
  email:String,
  password:String,
  gender:String,
  destination_country:String,
  destination_city:String,
  origin_country:String,
  spoken_languages:Array,
  rol:String,
  image:String,
  interests:String,
  description:String,
  buddy:String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;