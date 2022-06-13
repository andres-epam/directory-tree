const { directory } = require('../../directory');
const { DirectoryError } = require('../../errors/directory');
const { findValueFromPath, iterValidations, sortObject } = require('../../utils');

class DirectoryRepository {
  constructor(target = directory) {
    this.target = target;
  }

  #create(path, target) {
    const dirPaths = path.split('/');

    dirPaths.forEach(currentDir => {
      if (!target) return;

      const currentObjectLocation = target[currentDir];
      const newPath = dirPaths.slice(1).join('/');

      iterValidations.create({ path, target, originPath: this.originPath, currentDir, currentObjectLocation });
      this.#create(newPath, currentObjectLocation);
    });
  }

  #list(targetCopy) {
    let stringList = '';

    targetCopy = sortObject(targetCopy);

    Object.keys(targetCopy).forEach(
      key => (stringList += '\r\n' + iterValidations.list(this.target, key) + this.#list(targetCopy[key]))
    );

    return stringList;
  }

  #copy(toPath, target) {
    const dirPaths = toPath.split('/');

    dirPaths.forEach(currentDir => {
      if (!target) return;

      const currentObjectLocation = target[currentDir];
      const isCopied = iterValidations.move({
        toPath,
        target,
        originFromPath: this.originFromPath,
        targetToCopy: this.targetToCopy,
        currentDir,
        currentObjectLocation
      });

      if (isCopied) return;

      const newPath = dirPaths.slice(1).join('/');
      this.#copy(newPath, currentObjectLocation);
    });
  }

  #delete(path, target) {
    const dirPaths = path.split('/');

    dirPaths.forEach(currentDir => {
      if (!target) return;

      const currentObjectLocation = target[currentDir];
      const newPath = dirPaths.slice(1).join('/');

      iterValidations.delete({
        path,
        target,
        originPath: this.originPath,
        originTarget: this.originTarget,
        currentDir,
        currentObjectLocation
      });
      this.#delete(newPath, currentObjectLocation);
    });
  }

  create(path) {
    this.originPath = path;
    this.#create(path, this.target);

    return this.target;
  }

  list() {
    const targetCopy = JSON.parse(JSON.stringify(this.target));
    return this.#list(targetCopy).substring(2);
  }

  move(fromPath, toPath) {
    this.originFromPath = fromPath;
    this.targetToCopy = findValueFromPath(fromPath, this.target);

    if (!this.targetToCopy) throw new DirectoryError(`Cannot move ${fromPath} - incorrect path`);
    const lastDirName = fromPath.substring(fromPath.lastIndexOf('/') + 1);

    this.targetToCopy = { [lastDirName]: this.targetToCopy };

    this.#copy(toPath, this.target);
    this.delete(fromPath);

    return this.target;
  }

  delete(path) {
    this.originPath = path;
    this.originTarget = JSON.parse(JSON.stringify(this.target));

    this.#delete(path, this.target);
    return this.target;
  }
}

module.exports = {
  DirectoryRepository
};
