const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { findValueFromPath } = require('../../util/directory');

exports.deleteDirectory = (path, target = directory) => {
  const originPath = path;
  const originTarget = JSON.parse(JSON.stringify(directory));

  const recursiveDelete = (path, target) => {
    const dirPaths = path.split('/');

    for (const item of dirPaths) {
      if (!target) {
        continue;
      }

      const currentObjectLocation = target[item];

      if (currentObjectLocation && dirPaths.length === 1) {
        delete target[item];
        continue;
      }
      if (!currentObjectLocation) {
        if (dirPaths.length === 1) {
          continue;
        }

        if (!findValueFromPath(path, target) && !findValueFromPath(originPath, originTarget)) {
          throw new Error(`Cannot delete ${originPath} - ${item} does not exist`);
        }
      }

      dirPaths.shift();
      const newPath = dirPaths.join('/');
      recursiveDelete(newPath, currentObjectLocation);
    }

    return target;
  };

  try {
    const result = recursiveDelete(path, target);
    return result;
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};

exports.deleteDir = (path, target = directory) => {
  logger.info(`DELETE ${path}`);
  return exports.deleteDirectory(path, target);
};
