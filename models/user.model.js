module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        user: type.STRING
    })
};
