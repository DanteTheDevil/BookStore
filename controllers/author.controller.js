const db = require('../configs/db.config.js');

exports.create = (request, response) => {
    const {author} = request.body;
    let msg, status;

    db.sequelize.transaction(newTrans => {
        return db.author.findOrCreate({
            where: { author: author },
            defaults: { author: author },
            transaction: newTrans
        }).spread((result, created) => {
            msg = !created ?
                `Author with this name already exist in database` :
                `Author with name ${author} has been created`;
            status = !created ? 200 : 201;

            return result;
        })
    }).then(() => response.status(status).send(msg));
};

exports.read = (request, response) => {
    const {author} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.author.findOne({
            where: {
                author: author
            },
            transaction: newTrans
        })
    }).then(result => {
        const data = result ? result : 'There is no author with this name';
        const status = result ? 200 : 404;

        return response.status(status).send(data)});
};

exports.update = (request, response) => {
    const {author, newData} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.author.findOne({
            where: {
                author: author
            },
            transaction: newTrans
        }).then(result => {
            return result ?
                result.update(newData, {transaction: newTrans}) :
                null;
        })
    }).then(result => {
        const message = result ?
            `Author ${author} has been changed to ${newData.author}` :
            'There is no author with such name';
        const status = result ? 200 : 400;

        return response.status(status).send(message)
    });
};

exports.delete = (request, response) => {
    const {author} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.author.findOne({
            where: {
                author: author
            },
            transaction: newTrans
        }).then(result =>{
            return result ?
                result.destroy({transaction: newTrans}) :
                null;
        })
    }).then(result => {
        const message = result ?
            `Author with name ${author} has been deleted` :
            'There is no author with this name';
        const status = result ? 204 : 404;

        return response.status(status).send(message);
    }).catch(_ => response.status(403).send('This author has books in database, so you cant delete him'));
};
