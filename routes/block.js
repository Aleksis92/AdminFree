var User = require('models/user').User;
const asyncHandler = require('express-async-handler');

module.exports = function (app) {

    app.post('/block',asyncHandler( async (req, res) => {
        req.body.selfBlock = false;
        req.body.id.forEach( await function (item, i , arr) {
            User.update({id: item}, {block: "Yes"}, function (err) {
            });
            if (item == req.user.id) {
                req.body.selfBlock = true;
            }
        });
            res.json({"selfBlock" : req.body.selfBlock})

    }));
};