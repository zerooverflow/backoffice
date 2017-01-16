var express         = require('express');
var app             = express();
var port            = process.env.PORT || 8080;
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var passport        = require('passport');
var expressSession  = require('express-session');
var mysql           = require('mysql');
var flash           = require('connect-flash');

var pool =  mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'backoffice',
    password : 'backoffice',
    database : 'backoffice'
});


pool.getConnection(function(err, connection) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('mysql connected as id ' + connection.threadId);
    connection.release();
});

var db = require('./database/db.js')(pool);

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({secret: 'Toporagno',resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cookieParser()); // read cookies (needed for auth)

/*---------------------- STAGE STATIC RESOURCES --------------*/
app.use(express.static('bower_components'));
app.use(express.static('dev'));
/*------------------------------------------------------------*/

/*---------------------------- REQUIRES ----------------------*/
require('./passport/passport.js')(passport,pool);
require('./routes/routes.js')(app, passport);
require('./services/userService.js')(app,db);


/* --------------------------- LAUNCH ------------------------*/
app.listen(port);

console.log('The magic happens on port ' + port);

