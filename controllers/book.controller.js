const db = require('../configs/db.config.js');

exports.create = (request, response) => {
    const {name, author, year, description} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.author.findOrCreate({
            where: { author: author },
            defaults: { author: author },
            transaction: newTrans
        }).spread(result => {
                return result.createBook({
                        name: name,
                        year: year,
                        description: description
                    }, { transaction: newTrans }
                )
            })
    })
        .then(() => response.status(201).send(`Book with name ${name} by ${author} has been added`));
};

exports.read = (request, response) => {
    const {name, author} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.book.findOne({
            where: {
                name: name
            },
            include: {
                model: db.author,
                where: {
                    author: author
                }
            },
            transaction: newTrans
        })
    })
        .then(result => {
            const data = result ? result : 'There is no book with those parameters';
            const status = result ? 200 : 404;

            return response.status(status).send(data)});
};

exports.readAll = (request, response) => {
    const {name} = request.body;
    const {page} = request.query;

    db.sequelize.transaction(newTrans => {
        return db.book.findAll({
            where: {
                name: name
            },
            offset: (page - 1) * 5,
            limit: 5,
            transaction: newTrans
        })
    })   .then(result => {
        const data = result ? result : 'There is no books with those parameters';
        const status = result ? 200 : 404;

        return response.status(status).send(data)});
};

exports.update = (request, response) => {
    const {name, author, newData} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.book.findOne({
            where: {
                name: name
            },
            include: [{
                model: db.author,
                where: {
                    author: author
                }
            }],
            transaction: newTrans
        }).then(result => {
            return result ?
                result.update(newData) :
                null;
        })
    })
        .then(result => {
            const message = result ?
                `Book with title ${name} by author ${author} has been updated`:
                `There is no book with this name`;

            const status = result ? 200 : 400;

            return response.status(status).send(message)
        });
};
exports.delete = (request, response) => {
    const {name, author} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.book.findOne({
            where: {
                name: name
            },
            include: [{
                model: db.author,
                where: {
                    author: author
                }
            }],
            transaction: newTrans
        }).then(result => {
            return result ?
                result.destroy() :
                null;
        } )
    })
        .then(result => {
            const message = result ?
                `Book with title - ${name} by author - ${author} has been deleted` :
                'There is no book with such name and author';
            const status = result ? 204 : 400;

            return response.status(status).send(message);
        });
};
