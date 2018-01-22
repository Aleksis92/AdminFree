var express = require('express');
var favicon = require('serve-favicon');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var User = require('models/user').User;

var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.set('port', config.get('port'));

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function () {
    log.info("Express server listening on port " + app.get('port'))
});

require('boot/index')(app);

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

require('routes')(app);
