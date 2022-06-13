const { CREATE_ERROR } = require('../../../lib/constants/operationTypes');
const { DirectoryNotFoundError } = require('../../../lib/errors/directory');

describe('DirectoryNotFoundError', () => {
  test('should throw a DirectoryNotFoundError', () => {
    const type = CREATE_ERROR;
    const badDir = 'sirius';
    const path = `foo/${badDir}/bar`;

    const expectedErrorMessage = `Cannot ${type} ${path} - ${badDir} does not exist`;
    const error = new DirectoryNotFoundError(type, path, badDir);

    const throwErr = () => {
      throw error;
    };

    expect(throwErr).toThrow(expectedErrorMessage);
    expect(throwErr).toThrow(DirectoryNotFoundError);
  });
});
