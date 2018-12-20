const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantesSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['Mediterranean', 'Asian', 'American','Italian','Mexican','Others']
    },
    address: String,
    city: String,
    image:{
        type:String,
        default:'/images/icons/Restaurants.svg'
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Restaurantes = mongoose.model('Restaurantes', restaurantesSchema);
module.exports = Restaurantes;