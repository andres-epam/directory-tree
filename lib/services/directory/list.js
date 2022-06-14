const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { DirectoryRepository } = require('../../repositories/directory');

exports.list = (target = directory) => {
  logger.info('LIST');
  return new DirectoryRepository(target).list();
};
