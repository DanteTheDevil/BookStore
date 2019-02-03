const user = require('../controllers/user.controller.js');
const validator = require('express-joi-validation')({});
const { userValidation } = require('../services/validator.service.js');
const errorHandler = require('../services/errorHandler.service.js');

module.exports = app => {
    app.route('/api/user/:id')
        .get(validator.body(userValidation.user), errorHandler(user.read))
        .put(validator.body(userValidation.user), errorHandler(user.update))
        .delete(validator.body(userValidation.user), errorHandler(user.delete));

    app.route('/api/user')
        .post(validator.body(userValidation.user), errorHandler(user.create));

    app.route('/api/user/:id/book')
        .post(validator.body(userValidation.book), errorHandler(user.bookAdd))
        .delete(validator.body(userValidation.book), errorHandler(user.bookDelete));

};
