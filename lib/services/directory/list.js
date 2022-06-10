const { directory } = require('../../directory');
const { logger } = require('../../logger');

exports.list = (target = directory) => {
  logger.info('LIST');
  JSON.stringify(target, null, 2)
    .split('\n')
    .map(section => console.log(section.replace(/[{}":,]/g, '')));
  return target;
};
