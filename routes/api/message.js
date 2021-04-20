// Flow:  ajax => routes/api/ => controllers => dataBase => controllers => frontend

const router = require('express').Router();
const messageController = require('../../controllers/messageController');

//matches with '/api/message'
router.route('/')
    .get(messageController.getMessages)
    .post(messageController.createMessage);


//matches with '/api/message/serviceMessage'
router.route('/serviceMessage')
    .post(messageController.createServiceMessage);


//matches with '/api/message/delete'
router.route('/delete')
    .post(messageController.deleteMessage);

module.exports = router;