module.exports = function (app) {

require("./front")(app);

require("./auth")(app);

require('./delete')(app);

require('./block')(app);

require('./unblock')(app);

require("./error")(app);

};