const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  title:String,
  description:String,
  type:String,
  image:String,
  company_name:String,
  address:String

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;