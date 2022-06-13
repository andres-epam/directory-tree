const { DELETE_ERROR } = require('../../../lib/constants/operationTypes');
const { DirectoryNotFoundError } = require('../../../lib/errors/directory');
const { DirectoryRepository } = require('../../../lib/repositories/directory');
const { deleteDir } = require('../../../lib/services/directory');

jest.mock('../../../lib/directory', () => ({ directory: {} }));

describe('Delete Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('should delete a directory', () => {
    const expected = {
      vehicle: {
        car: {},
        bus: {}
      }
    };
    DirectoryRepository.prototype.delete = jest.fn(() => expected);

    const result = deleteDir('vehicle/car/wheel');
    expect(result).toEqual(expected);
  });

  test('should fail deleting a directory', () => {
    let path = 'vehicle/car/wheel/steel/carbon';
    let expectedMessage = `Cannot delete ${path} - carbon does not exist`;
    DirectoryRepository.prototype.delete = jest.fn(() => {
      throw new DirectoryNotFoundError(DELETE_ERROR, path, 'carbon');
    });

    expect(deleteDir(path)).toEqual(expectedMessage);

    path = 'vehicle/car/wheeL/steel';
    expectedMessage = `Cannot delete ${path} - wheeL does not exist`;
    DirectoryRepository.prototype.delete = jest.fn(() => {
      throw new DirectoryNotFoundError(DELETE_ERROR, path, 'wheeL');
    });

    expect(deleteDir(path)).toEqual(expectedMessage);
  });
});
