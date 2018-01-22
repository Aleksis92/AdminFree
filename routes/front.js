var User = require('models/user').User;
const asyncHandler = require('express-async-handler');

module.exports = function (app) {

    app.get('/',asyncHandler( async (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.user = user = {
                isAuthenticated: false
            };
        }
        if (req.isAuthenticated()) {
        await User.find({}, function (err, users) {
            users.forEach(function (item, i, arr) {
                if (req.user.id == item.id && item.block == "Yes") {
                    req.user.blockStatus = true;
                }
            });
            res.locals.allUsers = users;
            res.render("index")
        })}
        else {
            res.locals.user = false;
            res.render("index");
        }
    }));
};