const bookRoute = require('./book.route.js');
const userRoute = require('./user.route.js');
const authorRoute = require('./author.route.js');

module.exports = app => {
    bookRoute(app);
    userRoute(app);
    authorRoute(app);
};
