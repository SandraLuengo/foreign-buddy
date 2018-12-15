require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const services = [

    {
        tite:"Plumber",
        description:"un gran fontanero lo super recomiendo",
        type:"plumber",
        image:"https://img.icons8.com/ios/1600/plumber.png",
        company_name:"Super Plumbers",
        address:"Calle del Hierro,23"
    },
    {
        tite:"Plumber",
        description:"El mejor fontanero de la ciudad",
        type:"plumber",
        image:"https://img.icons8.com/ios/1600/plumber.png",
        company_name:"Plumberinos",
        address:"Calle Aluminio,34"
    },
    {
        tite:"Electrical technician",
        description:"Me encanto este electricista",
        type:"electrical technician",
        image:"https://image.flaticon.com/icons/svg/81/81652.svg",
        company_name:"Chispas",
        address:"Calle Amapola,56"
    },
    {
        tite:"Electrical technician",
        description:"Unos grandes profesionales",
        type:"electrical technician",
        image:"https://image.flaticon.com/icons/svg/81/81652.svg",
        company_name:"Tormentosos",
        address:"Avenida de la Rosa,34"
    },
    {
        tite:"Locksmith",
        description:"Menos mal que es un cerrajero 24h",
        type:"locksmith",
        image:"https://cdn3.iconfinder.com/data/icons/door-installation-repair-service/64/door-lock-repair-locksmith-10-512.png",
        company_name:"Abre-Todo",
        address:"Calle de la Cifra,45"
    },
    {
        tite:"Locksmith",
        description:"Los mejores cerrajeros de la ciudad",
        type:"locksmith",
        image:"https://cdn3.iconfinder.com/data/icons/door-installation-repair-service/64/door-lock-repair-locksmith-10-512.png",
        company_name:"24h cerrajeros",
        address:"Calle de la Memoria,78"
    },
    {
        tite:"Doctor",
        description:"Una gran doctora",
        type:"doctor",
        image:"https://cdn2.vectorstock.com/i/1000x1000/93/96/doctor-icon-medical-consultation-male-physician-vector-18769396.jpg",
        company_name:"Dientes",
        address:"Avenida mariposas,45"
    },
    {
        tite:"Doctor",
        description:"Los mejores profesionales de la zona",
        type:"doctor",
        image:"https://cdn2.vectorstock.com/i/1000x1000/93/96/doctor-icon-medical-consultation-male-physician-vector-18769396.jpg",
        company_name:"Cura Pupas",
        address:"Avenida Margarita,78"
    }
];

Service.create(services, (err) => {
    if (err) { throw (err) }
    console.log(`Created ${services.length} books`)
    mongoose.connection.close()
});