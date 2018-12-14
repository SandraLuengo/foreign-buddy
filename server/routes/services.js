const express = require('express');
const servicesRouter = express.Router();
const Service = require("../models/Service");

servicesRouter.get("/getServices", (req, res) => {
    console.log('Sandraaaaaaaaaaa')
    Service.find()
        .then(services =>{
            console.log('-----------SANDRA-----------')
            res.status(200).json(services)
        } )
        .catch(err => res.status(500).json({
            message: 'Error in the authentication',
        }))
});


module.exports = servicesRouter;