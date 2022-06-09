const { directory } = require('../../directory');
const { logger } = require('../../logger');
const { findValueFromPath } = require('../../util/directory');
const { deleteDir } = require('./delete');

exports.move = (fromPath, toPath, target = directory) => {
  const originFromPath = fromPath;
  logger.info(`MOVE ${originFromPath} ${toPath}`);

  try {
    let from = findValueFromPath(fromPath, directory);

    if (!from) throw new Error(`Cannot move ${fromPath} - incorrect path`);

    const lastDirName = fromPath.substring(fromPath.lastIndexOf('/') + 1);

    from = { [lastDirName]: from };

    const copyDirectory = (path, target) => {
      const dirPaths = path.split('/');

      for (const item of dirPaths) {
        if (!target) {
          continue;
        }

        const currentObjectLocation = target[item];

        if (currentObjectLocation && dirPaths.length === 1) {
          target[item] = from;
          continue;
        }

        if (!currentObjectLocation) {
          if (dirPaths.length === 1) {
            continue;
          }
          if (!findValueFromPath(path, target)) {
            throw new Error(`Cannot move ${originFromPath} - ${item} does not exist`);
          }
        }

        dirPaths.shift();
        const newPath = dirPaths.join('/');
        copyDirectory(newPath, currentObjectLocation);
      }

      return target;
    };

    deleteDir(fromPath);
    return copyDirectory(toPath, target);
  } catch (e) {
    logger.error(e.message);
    return e.message;
  }
};
