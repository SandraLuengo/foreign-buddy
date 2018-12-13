const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Modelos de paises, ciudades e idiomas, usuario con el id de esos modelos

const buddySchema = new Schema({
  username:String,
  surname:String,
  email:String,
  password:String,
  gender:String,
  spoken_languages:Array,
  buddy_city:String,
  buddy_country:String,
  rol:String,
  image:String,
  interests:String,
  description:String,
  users:Array,
  professional:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Buddy = mongoose.model('Buddy', buddySchema);
module.exports = Buddy;
