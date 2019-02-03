const author = require('../controllers/author.controller.js');
const validator = require('express-joi-validation')({});
const { authorValidation } = require('../services/validator.service.js');
const errorHandler = require('../services/errorHandler.service.js');

module.exports = app => {
    app.route('/api/author/:id')
        .get(validator.body(authorValidation), errorHandler(author.read))
        .put(validator.body(authorValidation), errorHandler(author.update))
        .delete(validator.body(authorValidation), errorHandler(author.delete));

    app.route('/api/author')
        .post(validator.body(authorValidation), errorHandler(author.create));
};
