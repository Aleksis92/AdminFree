var HttpError = require('error').HttpError;
var ErrorHandler = require('express-error-handler');
var sendHttpError = require('middleware/sendHttpError');

module.exports = function(app) {

    app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    });

    app.use(function(err, req, res, next) {
        if (typeof err == 'number') {
            console.log("1");
            err = new HttpError(err);
        }
        if (err instanceof HttpError) {
            console.log("2");
            sendHttpError(err, res);
        } else {
            if (app.get('env') == 'development') {
                console.log("3");
                ErrorHandler()(err, req, res, next);
            } else {
                console.log("4");
                log.error(err);
                err = new HttpError(500);
                sendHttpError(err, res);
            }
        }
    });
}