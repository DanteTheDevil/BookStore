module.exports = (sequelize, type) => {
    return sequelize.define('book', {
        name: type.STRING,
        year: type.INTEGER,
        description: type.STRING,
    })
};
