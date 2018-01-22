var passport = require('passport');

module.exports = function (app) {

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/fb',
        passport.authenticate('facebook', {
        })
    );

    app.get('/auth/fb/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/auth' }),
        function (req, res) {
            res.redirect('/');
        });


    app.get('/auth/vk',
        passport.authenticate('vk', {
            scope: ['friends']
        }),
        function (req, res) {
        });

    app.get('/auth/vk/callback',
        passport.authenticate('vk', {
            successRedirect: '/',
            failureRedirect: '/auth'
        }),
        function (req, res) {
            res.redirect('/');
        });

    app.get('/auth/twitter',
        passport.authenticate('twitter', {
        }),
        function (req, res) {
        });

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/auth'
        }),
        function (req, res) {
            res.redirect('/');
        });
};