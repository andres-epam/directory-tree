const { DirectoryError } = require('./directoryError');

class DirectoryNotFoundError extends DirectoryError {
  constructor(type, path, directory) {
    super(`Cannot ${type} ${path} - ${directory} does not exist`);
    this.data = { type, path, directory };
  }
}

module.exports = {
  DirectoryNotFoundError
};
