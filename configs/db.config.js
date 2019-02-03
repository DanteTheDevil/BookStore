const db = {};
const Sequelize = require('sequelize');
const sequelize = new Sequelize('crude', 'root', 'q1w2e3r4',{
    dialect: 'mysql',
    host: 'localhost',
    port: 6666,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.book = require('../models/book.model.js')(sequelize, Sequelize);
db.author = require('../models/author.model.js')(sequelize, Sequelize);
db.user = require('../models/user.model.js')(sequelize, Sequelize);

db.author.hasMany(db.book, {foreignKey: 'authorId', onDelete: 'RESTRICT'});
db.book.belongsTo(db.author);
db.book.belongsToMany(db.user, {as: 'User', through: 'bookUser', foreignKey: 'book_id', otherKey: 'user_id'});
db.user.belongsToMany(db.book, {as: 'Book', through: 'bookUser', foreignKey: 'user_id', otherKey: 'book_id'});

module.exports = db;
