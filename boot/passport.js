var config = require('config');
var passport = require('passport');
var AuthFacebookStrategy = require('passport-facebook').Strategy;
var AuthVKStrategy = require('passport-vkontakte').Strategy;
var AuthTwitterStrategy = require('passport-twitter').Strategy;
var User = require('models/user').User;

passport.use('facebook', new AuthFacebookStrategy({
        clientID: config.get("facebook:clientID"),
        clientSecret: config.get("facebook:clientSecret"),
        callbackURL: config.get("facebook:callbackURL"),
        profileFields: [
            'id',
            'displayName',
            'profileUrl',
            "first_name",
            "last_name",
            "gender",
            "picture"
        ]
    },
    function (accessToken, refreshToken, profile, done) {
        profile.photoUrl = profile.photos[0].value;
            var user = new User(profile);
            user.save(function (err, user, affected) {
            });

        return done(null, {
            id: profile.id,
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl,
            provider: profile.provider
        });
    }
));

passport.use('vk', new AuthVKStrategy({
        clientID: config.get("vk:clientID"),
        clientSecret: config.get("vk:clientSecret"),
        callbackURL: config.get("vk:callbackURL")
    },
    function (accessToken, refreshToken, profile, done) {

        profile.photoUrl = profile.photos[0].value;
        var user = new User(profile);
        user.save(function (err, user, affected) {
        });

        return done(null, {
            id: profile.id,
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl,
            provider: profile.provider
        });
    }
));

passport.use('twitter', new AuthTwitterStrategy.Strategy({
        consumerKey: config.get("twitter:consumerKey"),
        consumerSecret: config.get("twitter:consumerSecret"),
        callbackURL: config.get("twitter:callbackURL")
    },
    function (accessToken, refreshToken, profile, done) {

        profile.photoUrl = profile.photos[0].value;
        var user = new User(profile);
        user.save(function (err, user, affected) {
        });

        return done(null, {
            id: profile.id,
            username: profile.displayName,
            photoUrl: profile.photos[0].value,
            profileUrl: profile.profileUrl,
            provider: profile.provider
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};