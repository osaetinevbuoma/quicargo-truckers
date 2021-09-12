import * as compression from 'compression';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as winston from 'winston';
import * as controller from './controller';
import { SERVER_PORT, SERVER_HOST } from './env';

const app = express();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/logfile.log' })
    ]
});

app.use(compression());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride());

app.use('/api', controller.default);

app.listen(SERVER_PORT, () => {
    logger.log('info', `Server Port: ${SERVER_PORT}`);
    logger.log('info', `Server URL: http://${SERVER_HOST}:${SERVER_PORT}`);
});