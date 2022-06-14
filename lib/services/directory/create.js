const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { DirectoryRepository } = require('../../repositories/directory');

let repository;

exports.create = (path, target = directory) => {
  try {
    logger.info(`CREATE ${path}`);
    repository = new DirectoryRepository(target);
    return repository.create(path);
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};
