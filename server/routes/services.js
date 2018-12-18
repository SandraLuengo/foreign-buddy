const express = require('express');
const servicesRouter = express.Router();
const Locales = require('../models/Locales');
const Museos = require('../models/Museos');
const Restaurantes = require('../models/Restaurantes');
const Sitios = require('../models/Sitios');
const Tiendas = require('../models/Tiendas');

let model = '';

servicesRouter.post("/getServices", (req, res) => {

    getModel(req.body.place)
    getAll(req, res);

});

servicesRouter.post("/getServicesFilter", (req, res) => {
    console.log('getServicesFilter')

    getModel(req.body.place)
    if (req.body.filter !== 'all') {
        if (req.body.user.rol == 'user') {
            model.find({
                    city: req.body.user.destination_city,
                    type: req.body.filter
                })
                .then(places => res.status(200).json(places))
                .catch(err => res.status(500).json({
                    message: 'Error serving places'
                }))
        } else {
            model.find({
                    city: req.body.user.buddy_city,
                    type: req.body.filter
                })
                .then(places => res.status(200).json(places))
                .catch(err => res.status(500).json({
                    message: 'Error serving places'
                }))
        }
    } else {
        getAll(req, res);
    }
})

function getModel(place) {
    switch (place) {
        case 'museums':
            model = Museos;
            break;
        case 'local':
            model = Locales;
            break;
        case 'restaurants':
            model = Restaurantes;
            break;
        case 'places':
            model = Sitios;
            break;
        case 'shops':
            model = Tiendas;
            break;
    }
}

function getAll(req, res) {
    if (req.body.user.rol == 'user') {
        model.find({
                city: req.body.user.destination_city
            })
            .then(places => res.status(200).json(places))
            .catch(err => res.status(500).json({
                message: 'Error serving places'
            }))
    } else {
        model.find({
                city: req.body.user.buddy_city
            })
            .then(places => res.status(200).json(places))
            .catch(err => res.status(500).json({
                message: 'Error serving places'
            }))
    }
}

module.exports = servicesRouter;