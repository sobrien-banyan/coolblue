// Flow: ajax => routes/api/ => controllers => dataBase => controllers => frontend

const keys = require("../config/keys");

// Message Model
const Message = require('../models/Message');


module.exports = {
    //get messages
    getMessages: (req, res) => {
        Message.find()
            .sort({ date: -1 })
            .then(messages => res.json(messages))
            .catch(err => console.error(err));
    },
    //create message, api/message
    createMessage: (req, res) => {
//if password matches return messages
if(req.body.name === keys.password){
   return Message.find()
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err => console.error(err));
   
}

        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        newMessage.save().then(() => {
            Message.find()
            .sort({ date: -1 })
            .then(messages => res.status(200).json({successMessage: "Thanks for messaging us."}))
            .catch(err => console.error(err));
        })
            .catch(err => console.error(err));
    },
    //Delete message, api/message
    deleteMessage: (req, res) => {
        Message.findById(req.body.id)
            .then(message => message.remove())
            .then(() => {
                Message.find()
                .sort({ date: -1 })
                .then(messages => res.json(messages));
            }) 
            .catch(err => console.error(err));
    },
    //create message, api/createServiceMessage
    createServiceMessage: (req, res) => {
        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            time: req.body.time,
            date: req.body.date
        });
        newMessage.save().then(() => {
            Message.find()
            .sort({ date: -1 })
            .then(messages => res.json(messages))
            .catch(err => console.error(err));
        })
            .catch(err => console.error(err));
    },
};


