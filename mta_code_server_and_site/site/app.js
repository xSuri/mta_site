// LIBLARY
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
const session = require('express-session');
const passport = require('passport');

const app = express();

// FOLDER / VISUAL ENGINE
app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/views' + '/auths'));
app.use(express.static(__dirname + '/views' + '/site'));
app.use(express.static(__dirname + '/views' + '/others'));

app.set('view engine', "hbs");

// ADD PUBLIC FOLDER TO SHOW IMAGES AND LINK CSS

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public' + '/js'));
app.use(express.static(__dirname + '/public' + '/css'));
app.use(express.static(__dirname + '/public' + '/images'));

// CONFIG SESSION/BODYPARSER/COOKIEPARSER/FLASH

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// app.set('trust proxy', 1) // trust proxy

app.use(session({
    secret: 'mtaCodes',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true}
}));

app.use(flash());

    
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());


// MAIN ROUTE

app.use('/',  routes);

// AUTHS ROUTES

app.use('/google' , routes);
app.use('/github' , routes);
app.use('/youtube' , routes);
app.use('/oauth/facebook' , routes);

// -*-*-*-*-


// EXPORT APP TO LINK IN SERVER

module.exports = app;
