module.exports = (sequelize, type) => {
    return sequelize.define('author', {
        author: type.STRING
    })
};
