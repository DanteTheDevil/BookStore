const errorHandler = route => (request, response, next) => {
    Promise.resolve(route(request, response, next))
        .catch(error => {
            response.status(500).send(error);
        });
};

module.exports = errorHandler;
