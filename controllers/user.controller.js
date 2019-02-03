const db = require('../configs/db.config.js');

exports.create = (request, response) => {
    const {user} = request.body;
    let msg, status;

    db.sequelize.transaction(newTrans => {
        return db.user.findOrCreate({
            where: { user: user },
            defaults: { user: user },
            transaction: newTrans
        }).spread((result, created) => {
            msg = !created ?
                `User with this name already exist in database` :
                `User with name ${user} has been created`;
            status = !created ? 200 : 201;

            return result;
        })
    }).then(() => response.status(status).send(msg));
};

exports.read = (request, response) => {
    const {user} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.user.findOne({
            where: {
                user: user
            },
            transaction: newTrans
        })
    }).then(result => {
        const data = result ? result : 'There is no user with this name';
        const status = result ? 200 : 404;

        return response.status(status).send(data)});
};

exports.update = (request, response) => {
    const {user, newData} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.author.findOne({
            where: {
                author: user
            },
            transaction: newTrans
        }).then(result => {
            return result ?
                result.update(newData) :
                null;
        })
    }).then(result => {
        const message = result ?
            `User ${user} has been changed to ${newData.user}` :
            'There is no user with such name';
        const status = result ? 200 : 400;

        return response.status(status).send(message)
    });
};

exports.delete = (request, response) => {
    const {user} = request.body;

    db.sequelize.transaction(newTrans => {
        return db.user.findOne({
            where: {
                user: user
            },
            transaction: newTrans
        }).then(result =>{
            return result ?
                result.destroy() :
                null;
        })
    }).then(result => {
        const message = result ?
            `User with name ${user} has been deleted` :
            'There is no user with this name';
        const status = result ? 200 : 404;

        return response.status(status).send(message);
    });
};

exports.bookAdd = (request, response) => {
    const {name, author, user} = request.body;
    let book;

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
          }).then(existedBook => {
              if(existedBook) {
                  book = existedBook;

                 return db.user.findOne({
                      where: {
                          user: user
                      },
                      transaction: newTrans
                  });
              } else {
                  return null;
              }
      }).then(existedUser => {
          return existedUser ?
              existedUser.addBook(book, {transaction: newTrans}):
              null;
      })
    }).then(result => {
      const message = result ?
          'Book has been added to users collection':
          'Book or user doesnt exist';
      const status = result ? 200 : 400;

      return response.status(status).send(message);
    });
};

exports.bookDelete = (request, response) => {
    const {name, author, user} = request.body;
    let book;

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
        }).then(existedBook => {
            if(existedBook) {
                book = existedBook;

                return db.user.findOne({
                    where: {
                        user: user
                    },
                    transaction: newTrans
                });
            } else {
                return null;
            }
        }).then(existedUser => {
            return existedUser ?
                existedUser.removeBook(book, {transaction: newTrans}):
                null;
        })
    }).then(result => {
        const message = result ?
            'Book has been deleted from users collection':
            'Book or user doesnt exist';
        const status = result ? 204 : 400;

        return response.status(status).send(message);
    });
};
