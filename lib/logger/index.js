const winston = require('winston');
const config = require('../../config');
const { format, transports, addColors, createLogger } = winston;

const { combine, timestamp, label, printf, colorize, errors } = format;
const myCustomLevels = {
    colors: {
        info: 'bold blue',
        warn: 'bold yellow',
        error: 'bold red'
    }
};

addColors(myCustomLevels.colors);

const myFormat = printf((info) =>
    info.hasOwnProperty('data') ?
        `${colorize().colorize(info.level, `[LOG] -> ${info.timestamp} ${info.label} ${info.level.toUpperCase()}:`)} ${info.message} ${info.data} ${colorize().colorize(info.level, '<---------- [END LOG]')}`
        :
        `${colorize().colorize(info.level, `[LOG] -> ${info.timestamp} ${info.label} ${info.level.toUpperCase()}:`)} ${info.message} ${colorize().colorize(info.level, '<---------- [END LOG]')}`
);

const addMetadata = winston.format(info => {
    const symbolKey = Reflect.ownKeys(info).find(key => key.toString() === 'Symbol(splat)');
    if (!symbolKey) return info;
    const data = info[symbolKey][0];
    info.data = JSON.stringify(data);
    return info;
});

const timezone = () =>
    new Date().toLocaleString(config.localeTime, {
        timeZone: config.timeZone,
        timeZoneName: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

exports.logger = createLogger({
    format: combine(
        errors({ stack: true }),
        addMetadata(),
        timestamp({ format: timezone }),
        label({ label: '---------->' }),
        myFormat,
    ),
    transports: [
        new transports.Console(),
    ]
});
