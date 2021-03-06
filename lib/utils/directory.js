const { CREATE_ERROR, MOVE_ERROR, DELETE_ERROR } = require('../constants/operationTypes');
const { DirectoryNotFoundError } = require('../errors/directoryNotFoundError');

const findValueFromPath = (path, target) => {
  path.split('/').forEach(dir => {
    if (!target) return;
    target = target[dir];
  });

  return target;
};

const sortObject = obj =>
  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((prev, current) => ((prev[current] = obj[current]), prev), {});

const findToCreate = data => {
  const { path, target, originPath, currentDir } = data;
  const pathsList = path.split('/');

  if (!target[currentDir]) {
    if (pathsList.length === 1) {
      target[currentDir] = {};
      return;
    }

    if (!findValueFromPath(path, target)) {
      throw new DirectoryNotFoundError(CREATE_ERROR, originPath, currentDir);
    }
  }
};

const displayPath = (target, key, spaces = '') => {
  let value;
  Object.keys(target).some(subKey => {
    if (subKey === key) {
      value = spaces + key;
      console.log(value);
      return true;
    }

    value = displayPath(target[subKey], key, spaces + ' ');
    return value;
  });
  return value;
};

const findToCopy = data => {
  const { toPath, target, originFromPath, targetToCopy, currentDir } = data;
  const pathsList = toPath.split('/');

  if (target[currentDir] && pathsList.length === 1) {
    target[currentDir] = {
      ...target[currentDir],
      ...targetToCopy
    };
    return true;
  }

  if (!target[currentDir]) {
    if (!findValueFromPath(toPath, target)) {
      throw new DirectoryNotFoundError(MOVE_ERROR, originFromPath, currentDir);
    }
  }
};

const findToDelete = data => {
  const { path, target, originPath, originTarget, currentDir } = data;
  const pathsList = path.split('/');

  if (target[currentDir] && pathsList.length === 1) {
    delete target[currentDir];
    return;
  }
  if (!target[currentDir]) {
    if (pathsList.length === 1) return;

    if (!findValueFromPath(path, target) && !findValueFromPath(originPath, originTarget)) {
      throw new DirectoryNotFoundError(DELETE_ERROR, originPath, currentDir);
    }
  }
};

module.exports = {
  findValueFromPath,
  sortObject,
  iterValidations: {
    create: findToCreate,
    list: displayPath,
    move: findToCopy,
    delete: findToDelete
  }
};
