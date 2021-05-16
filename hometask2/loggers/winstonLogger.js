const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'epam-hometask-service' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    ],
});


module.exports = logger;