const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const expressWinston = require('express-winston');
const winston = require('winston');
const db = require('./configs/db.config.js');
const routes = require('./routes/index.route.js');
const accessLogStream = fs.createWriteStream(path.join(__dirname, './log/morgan.log'), { flags: 'a' });

db.sequelize.sync()
    .then(() => {
       console.log('Base has been synced');
    });

app.use(express.json());

app.use(morgan('combined', { stream: accessLogStream }));

routes(app);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: './log/winston.log', level: 'error' }),
    ],
    format: winston.format.json()
}));

app.listen(3333);

