var mongoose = require('libs/mongoose');

    Schema = mongoose.Schema;

var schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    block: {
        type: String,
        default: "No"
    }
});



exports.User = mongoose.model('User', schema);