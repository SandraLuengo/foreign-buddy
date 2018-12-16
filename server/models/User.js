const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Modelos de paises, ciudades e idiomas, usuario con el id de esos modelos

const userSchema = new Schema({
  username:String,
  surname:String,
  email:String,
  password:String,
  gender:String,
  age:String,
  destination_country:String,
  destination_city:String,
  origin_country:String,
  spoken_languages:Array,
  rol:String,
  image:{
    type:String,
    default:"https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  },
  interests:String,
  description:String,
  buddies:Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
