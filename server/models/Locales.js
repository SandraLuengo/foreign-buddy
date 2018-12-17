const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localesSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['Pub', 'Night club', 'Lounge']
    },
    address: String,
    city: String

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Locales = mongoose.model('Locales', localesSchema);
module.exports = Locales;