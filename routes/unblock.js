var User = require('models/user').User;
const asyncHandler = require('express-async-handler');

module.exports = function (app) {

    app.post('/unblock',asyncHandler( async (req, res) => {
        req.body.Unblock = false;
        req.body.id.forEach( await function (item, i , arr) {
            User.update({id: item}, {block: "No"}, function (err) {
            });
            if (item == req.user.Unblock) {
                req.body.Unblock = true;
            }
        });
        res.json({"Unblock" : req.body.Unblock})

    }));
};