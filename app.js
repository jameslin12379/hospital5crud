require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var redis = require("redis").createClient();
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var oracledb = require('oracledb');
var methodOverride = require("method-override");
var bcrypt = require('bcryptjs');
var saltRounds = 10;
var indexRouter = require('./routes/index');
var cors = require('cors');
var app = express();

var oraConfig = {
    user: process.env.DB_USERNAME,    
    password: process.env.DB_PASSWORD,
    connectString: `${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

oracledb.getConnection(
    oraConfig,
    function(err, connection)
    {
        if (err) {
            console.error(err.message);
            return;
        }
        global.connection = connection;
        console.log('connected');
        // connection.execute("SELECT * FROM doctors",
        //     function(err, result)
        //     {
        //         if (err) {
        //             console.error(err.message);
        //             return;
        //         }
        //         console.log(result.metaData);
        //         console.log(result.rows);
        //     });
        // connection.execute(
        //     "SELECT department_id, department_name "
        //     + "FROM departments "
        //     + "WHERE department_id = :did",
        //     [180],
        //     function(err, result)
        //     {
        //         if (err) {
        //             console.error(err.message);
        //             return;
        //         }
        //         console.log(result.rows);
        //     });
    });
// global.connection = connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    store: new RedisStore({ host: 'localhost', port: 6379, client: redis }),
    secret: "cats",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
        console.log(sql);
        connection.execute(sql, function(err, result){
            if (err) {
                console.error(err.message);
                return;
            }
            if (result.rows.length === 0){
                return done(null, false, req.flash('errors', 'No user found.'), req.flash('input', email));
            }
            // const hash = rows[0].password.toString();
            const pass = process.env.PASS;
            if (pass === password){
                return done(null, result.rows[0]);
            }
            return done(null, false, req.flash('errors', 'Oops! Wrong password.'), req.flash('input', email));
        });}));
            // const hash = rows[0].password.toString();
            // bcrypt.compare(password, hash, function(err, response) {
            //     if (response === true) {
            //         return done(null, rows[0]);
            //     }
            //     return done(null, false, req.flash('errors', 'Oops! Wrong password.'), req.flash('input', email));
            // });
            // if (!( rows[0].password === password))
            //     return done(null, false, req.flash('errors', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user

            // return done(null, rows[0]);



passport.serializeUser(function(user, done) {
    done(null, user[0]);
});

passport.deserializeUser(function(id, done) {
    const sql = `SELECT id, email, username, imageurl, lv FROM users WHERE id = ${id}`;
    connection.execute(sql, function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        done(err, result.rows[0]);
    });
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.redirect('/404');
    res.render('404');
});

module.exports = app;
