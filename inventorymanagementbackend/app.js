var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Libraries that you require to set up authorization.
var passport = require('passport');
var xsenv = require('@sap/xsenv');
var JWTStrategy = require('@sap/xssec').JWTStrategy;

//Using a Database Interface file which has all the DB specific code
var hdbext = require('@sap/hdbext');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Configure HANA db
var hanaOptions = xsenv.getServices({hana: { tag: 'hana' }}).hana;
app.use(hdbext.middleware(hanaOptions));

// Authenticate the access and add the authorization information to the request.
// Uncomment the following code if you want to access your backend directly from the URL.
// Please note that doing so will hamper the database functionality (Since we won't be able to access the tenant identity zone)
var services = xsenv.getServices({ uaa: { tag: "xsuaa" } });
passport.use(new JWTStrategy(services.uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
