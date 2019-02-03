const Joi = require('joi');

const bookValidation = {
    post: Joi.object({
        name: Joi.string().min(1).max(100).required(),
        year: Joi.number().integer().max(new Date().getFullYear()).required(),
        description: Joi.string().trim().min(1).max(500).required(),
        author: Joi.string().min(1).max(50).required()
    }),
    read: Joi.object({
        name: Joi.string().min(1).max(100).required(),
        author: Joi.string().min(1).max(50).required()
    }),
    readAll: Joi.object({
        name: Joi.string().min(1).max(100).required()
    }),
    update: Joi.object({
        name: Joi.string().min(1).max(100).required(),
        year: Joi.number().integer().max(new Date().getFullYear()),
        description: Joi.string().trim().min(1).max(500),
        author: Joi.string().min(1).max(50).required()
    }),
    delete: Joi.object({
        name: Joi.string().min(1).max(100).required(),
        author: Joi.string().min(1).max(50).required()
    })
};

const authorValidation = Joi.object({
    author: Joi.string().min(1).max(50).required()
});

const userValidation = {
    user: Joi.object({
        user: Joi.string().min(1).max(50).required()
    }),
    book: Joi.object({
        user: Joi.string().min(1).max(50).required(),
        name: Joi.string().min(1).max(100).required(),
        author: Joi.string().min(1).max(50).required()
    })
};

module.exports = {
    bookValidation,
    authorValidation,
    userValidation
};
