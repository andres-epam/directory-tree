const environment = 'development';
exports.config = {
    environment,
    directoryPath: `${process.env.DIRECTORY_PARENT_PATH}/${environment}/${process.env.DIRECTORY_FILENAME}`,
    isDevelopment: true
};