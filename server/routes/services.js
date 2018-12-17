const express = require('express');
const servicesRouter = express.Router();
const Locales = require('../models/Locales');
const Museos = require('../models/Museos');
const Restaurantes = require('../models/Restaurantes');
const Sitios = require('../models/Sitios');
const Tiendas = require('../models/Tiendas');

servicesRouter.post("/getServices", (req, res) => {
    console.log('-------------------------')
    console.log(req.body.place)
    let model = '';
    switch(req.body.place){
        case 'museums':
            model=Museos;
            break;
        case 'local':
            model=Locales;
            break;
        case 'restaurants':
            model=Restaurantes;
            break;
        case 'places':
            model=Sitios;
            break;
        case 'shops':
            model=Tiendas;
            break;
    }
    if(req.body.user.rol=='user'){
        model.find({city:req.body.user.destination_city})
        .then(places=>res.status(200).json(places))
        .catch(err=>res.status(500).json({message: 'Error serving places'}))
    }else{
        model.find({city:req.body.user.buddy_city})
        .then(places=>res.status(200).json(places))
        .catch(err=>res.status(500).json({message: 'Error serving places'}))
    }
    
    
    // Service.find()
    //     .then(services =>{
    //         console.log('-----------SANDRA-----------')
    //         res.status(200).json(services)
    //     } )
    //     .catch(err => res.status(500).json({
    //         message: 'Error in the authentication',
    //     }))
});


module.exports = servicesRouter;