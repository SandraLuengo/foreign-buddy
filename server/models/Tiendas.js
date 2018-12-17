const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tiendasSchema = new Schema({
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

const Tiendas = mongoose.model('Tiendas', tiendasSchema);
module.exports = Tiendas;