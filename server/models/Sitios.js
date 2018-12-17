const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sitiosSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['Tourist attraction', 'Market', 'Sculptures','Monuments']
    },
    address: String,
    city: String

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Sitios = mongoose.model('Sitios', sitiosSchema);
module.exports = Sitios;