const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { findValueFromPath } = require('../../util/directory');

exports.deleteDir = (path, target = directory) => {
  const originPath = path;
  logger.info(`DELETE ${originPath}`);
  const originTarget = JSON.parse(JSON.stringify(directory));

  const deleteDirectory = (path, target) => {
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
      deleteDirectory(newPath, currentObjectLocation);
    }

    return target;
  };

  try {
    return deleteDirectory(path, target);
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};
