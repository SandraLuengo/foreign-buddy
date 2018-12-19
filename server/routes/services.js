const express = require('express');
const servicesRouter = express.Router();
const Locales = require('../models/Locales');
const Museos = require('../models/Museos');
const Restaurantes = require('../models/Restaurantes');
const Sitios = require('../models/Sitios');
const Tiendas = require('../models/Tiendas');

const {
    getModel,
    getAll
} = require('../utils/servicesFunctions');

servicesRouter.post("/getServices", (req, res) => {

    getAll(req, res, getModel(req.body.place));

});

servicesRouter.post("/getServicesFilter", (req, res) => {

    if (req.body.filter !== 'all') {
        if (req.body.user.rol == 'user') {
            getModel(req.body.place).find({
                    city: req.body.user.destination_city,
                    type: req.body.filter
                })
                .then(places => res.status(200).json(places))
                .catch(err => res.status(500).json({
                    message: 'Error serving places'
                }))
        } else {
            getModel(req.body.place).find({
                    city: req.body.user.buddy_city,
                    type: req.body.filter
                })
                .then(places => res.status(200).json(places))
                .catch(err => res.status(500).json({
                    message: 'Error serving places'
                }))
        }
    } else {
        getAll(req, res, getModel(req.body.place));
    }
})

servicesRouter.post("/getTypes", (req, res) => {

    myService = new getModel(req.body.place)
    res.status(200).json(myService.schema.path('type').enumValues);
})

servicesRouter.post("/newService", (req, res) => {

    myService = new getModel(req.body.place)({
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        city: req.body.city
    });

    myService.save()
        .then(algo => res.status(200).json())
        .then(err => console.log(err))
})

module.exports = servicesRouter;