const Locales = require('../models/Locales');
const Museos = require('../models/Museos');
const Restaurantes = require('../models/Restaurantes');
const Sitios = require('../models/Sitios');
const Tiendas = require('../models/Tiendas');

function getModel(place) {

    switch (place) {
        case 'museums':
            return Museos;
        case 'local':
            return Locales;
        case 'restaurants':
            return Restaurantes;
        case 'places':
            return Sitios;
        case 'shops':
            return Tiendas;
    }

}

function getAll(req, res, model) {
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

module.exports = {
    getModel,
    getAll
};