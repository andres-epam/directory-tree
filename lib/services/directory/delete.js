const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { DirectoryRepository } = require('../../repositories/directory');

let repository;

exports.deleteDir = (path, target = directory) => {
  try {
    logger.info(`DELETE ${path}`);
    repository = new DirectoryRepository(target);

    return repository.delete(path);
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};
