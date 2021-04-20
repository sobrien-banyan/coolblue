const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require
    },
    dateStamp: {
        type: Date,
        default: Date.now
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);