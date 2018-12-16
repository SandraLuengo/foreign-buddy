const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Modelos de paises, ciudades e idiomas, usuario con el id de esos modelos

const buddySchema = new Schema({
  username:String,
  surname:String,
  email:String,
  password:String,
  gender:String,
  age:String,
  spoken_languages:Array,
  buddy_city:String,
  buddy_country:String,
  rol:String,
  image:{
    type:String,
    default:"https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  },
  interests:String,
  description:String,
  users:Array,
  professional:{
    type:Boolean,
    default:false
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Buddy = mongoose.model('Buddy', buddySchema);
module.exports = Buddy;
