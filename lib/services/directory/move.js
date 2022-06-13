const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { DirectoryRepository } = require('../../repositories/directory');

let repository;

exports.move = (fromPath, toPath, target = directory) => {
  try {
    logger.info(`MOVE ${fromPath} ${toPath}`);
    repository = new DirectoryRepository(target);

    return repository.move(fromPath, toPath);
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};
