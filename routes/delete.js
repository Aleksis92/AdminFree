var User = require('models/user').User;
const asyncHandler = require('express-async-handler');

module.exports = function (app) {

    app.post('/delete',asyncHandler( async (req, res) => {
        var selfDestroy = false;
        req.body.id.forEach( await function (item, i , arr) {
                User.findOneAndRemove({id: item}, function (err) {
            });
            if (item == req.user.id) {
                req.session.destroy();
                selfDestroy = true;
            }
        });
            res.json({"selfDestroy" : selfDestroy})

    }));
};