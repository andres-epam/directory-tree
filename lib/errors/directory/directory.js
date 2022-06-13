class DirectoryError extends Error {
  constructor(message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DirectoryError);
    }

    this.name = this.constructor.name;
  }
}

module.exports = {
  DirectoryError
};
