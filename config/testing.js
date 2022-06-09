const environment = 'testing';
exports.config = {
  environment,
  directoryPath: `${process.env.DIRECTORY_PARENT_PATH}/${environment}/${process.env.DIRECTORY_FILENAME}`,
  isTesting: true
};
