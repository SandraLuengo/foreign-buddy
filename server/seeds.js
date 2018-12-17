require('dotenv').config();
const mongoose = require('mongoose');
const Locales = require('./models/Locales');
const Museos = require('./models/Museos');
const Restaurantes = require('./models/Restaurantes');
const Sitios = require('./models/Sitios');
const Tiendas = require('./models/Tiendas');


mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const locales = [

    {
        name:'Sandra',
        type:'Pub',
        address:'Sandra, 45',
        city:'Berlin'
    },
    {
        name:'Angel',
        type:'Night club',
        address:'Angel 56',
        city:'Berlin'
    },
    {
        name:'Jorge',
        type:'Lounge',
        address:'Jorge 32',
        city:'Berlin'
    }
];

const museos = [

    {
        name:'Plantas',
        type:'Modern',
        address:'Plantas, 45',
        city:'Berlin'
    },
    {
        name:'Cuencos',
        type:'Classic',
        address:'Cuencos 56',
        city:'Berlin'
    },
    {
        name:'Recipe',
        type:'Alternative',
        address:'Recipe 32',
        city:'Berlin'
    }
];

Locales.create(locales, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${locales.length} locales`)
    mongoose.connection.close()
});

Museos.create(museos, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${museos.length} locales`)
    mongoose.connection.close()
});

