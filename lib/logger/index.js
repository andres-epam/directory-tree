const winston = require('winston');
const { isProduction } = require('../../config');

const { format, transports, addColors, createLogger } = winston;
const { printf, colorize } = format;

const myCustomLevels = {
  colors: {
    info: 'bold blue',
    warn: 'bold yellow',
    error: 'bold red'
  }
};

const devFormat = printf(info => `${colorize().colorize(info.level, `${info.level.toUpperCase()}:`)} ${info.message}`);
const console = new transports.Console();
addColors(myCustomLevels.colors);

const logger = createLogger({
  format: printf(info => info.message),
  transports: [console]
});

if (!isProduction) console.format = devFormat;

module.exports = {
  logger
};
