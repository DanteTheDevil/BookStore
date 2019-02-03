const book = require('../controllers/book.controller.js');
const validator = require('express-joi-validation')({});
const { bookValidation } = require('../services/validator.service.js');
const errorHandler = require('../services/errorHandler.service.js');

module.exports = app => {
    app.route('/api/book/:id')
        .get(validator.body(bookValidation.read), errorHandler(book.read))
        .put(validator.body(bookValidation.update), errorHandler(book.update))
        .delete(validator.body(bookValidation.delete), errorHandler(book.delete));

    app.route('/api/book')
        .post(validator.body(bookValidation.post), errorHandler(book.create))
        .get(validator.body(bookValidation.readAll), errorHandler(book.readAll));
};
