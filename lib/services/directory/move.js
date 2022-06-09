const { directory } = require("../../directory");
const { logger } = require("../../logger");
const { findValueFromPath } = require("../../util/directory");
const { deleteDir } = require("./delete");

exports.move = (fromPath, toPath) => {
    const originFromPath = fromPath;
    logger.info(`MOVE ${originFromPath} ${toPath}`);

    try {
        const from = findValueFromPath(fromPath, directory);

        if (!from) throw new Error(`Cannot move ${fromPath} - incorrect path`)

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
                        throw new Error(`Cannot create ${originFromPath} - ${item} does not exist`);
                    }
                }

                dirPaths.shift();
                const newPath = dirPaths.length ? dirPaths.join('/') : undefined;
                copyDirectory(newPath, currentObjectLocation);

            }

            return target;
        }

        deleteDir(fromPath);
        return copyDirectory(toPath, directory);


    } catch (e) {
        logger.error(e.message);
        return e.message;
    }

}
