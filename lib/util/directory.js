exports.findValueFromPath = (path, target) => {
    path = path.split('/');

    for (var i = 0; i < path.length; i++) {
        if (!target) continue;
        target = target[path[i]];
    };
    return target;
};
