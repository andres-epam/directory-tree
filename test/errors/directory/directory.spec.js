const { MOVE_ERROR } = require('../../../lib/constants/operationTypes');
const { DirectoryError } = require('../../../lib/errors/directory');

describe('DirectoryError', () => {
  test('should throw a DirectoryError', () => {
    const type = MOVE_ERROR;
    const path = 'foo/bar';

    const expectedErrorMessage = `Cannot ${type} ${path} - incorrect path`;
    const error = new DirectoryError(expectedErrorMessage);

    const throwErr = () => {
      throw error;
    };

    expect(throwErr).toThrow(expectedErrorMessage);
    expect(throwErr).toThrow(DirectoryError);
  });
});
