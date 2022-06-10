const environment = 'development';
exports.config = {
  environment,
  directoryPath: `${process.env.DIRECTORY_PARENT_PATH}/${environment}/${process.env.DIRECTORY_FILENAME}`,
  instructionsPath: `${process.env.DIRECTORY_PARENT_PATH}/${environment}/${process.env.INSTRUCTIONS_FILENAME}`,
  isDevelopment: true
};
