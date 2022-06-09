const { directory } = require("../../directory");
const { logger } = require("../../logger");
const { findValueFromPath } = require("../../util/directory");

exports.create = path => {
    const originPath = path;
    logger.info(`CREATE ${originPath}`);

    const createDirectory = (path, target) => {
        const dirPaths = path.split('/');

        for (const item of dirPaths) {
            if (!target) {
                continue;
            }

            const currentObjectLocation = target[item];

            if (!currentObjectLocation) {
                if (dirPaths.length === 1) {
                    target[item] = {};
                    continue;
                }

                if (!findValueFromPath(path, target)) {
                    throw new Error(`Cannot create ${originPath} - ${item} does not exist`);
                }
            }

            dirPaths.shift();
            const newPath = dirPaths.length ? dirPaths.join('/') : undefined;
            createDirectory(newPath, currentObjectLocation);

        }

        return target;
    }

    try {
        return createDirectory(path, directory);
    } catch (e) {
        logger.error(e.message);
        return e.message;
    }
};