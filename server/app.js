require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const path = require('path')

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });


const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

require('./passport')(app);

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));



app.use('/', require('./routes/index'));

app.use((req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
}); 


module.exports = app;