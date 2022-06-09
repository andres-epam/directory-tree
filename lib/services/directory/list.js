const { directory } = require("../../directory");


// TODO: Incompleted, it has to be finished.
exports.list = () => {
    const listDirectory = (target, tabs = '', iters = 0) => {

        Object.keys(target).forEach((key, i) => {
            for (let j = 0; j <= iters; j++) {
                tabs = tabs + '\t';
            }
            console.log(`${tabs}${key}`);
            listDirectory(target[key], tabs, iters)
        });
        if (Object.keys(target).length) {
            iters++;
        }

    }

    try {
        return listDirectory(directory);
    } catch (e) {
        return e.message;
    }
};
