var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var session = require('express-session');
var passport = require ('passport');
var flash = require('connect-flash');
var log = require('libs/log')(module);

module.exports = function (app) {

if (app.get('env') == 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'))
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key : config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    store: new MongoStore({mongooseConnection: mongoose.connection })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

};


/*app.use(function (req, res, next) {
   req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
   res.send("Visits: " + req.session.numberOfVisits);
});*/

/*
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/