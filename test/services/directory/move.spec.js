const { MOVE_ERROR } = require('../../../lib/constants/operationTypes');
const { DirectoryError, DirectoryNotFoundError } = require('../../../lib/errors/directory');
const { DirectoryRepository } = require('../../../lib/repositories/directory');
const { move } = require('../../../lib/services/directory');

jest.mock('../../../lib/directory', () => ({ directory: {} }));

describe('Move Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should move a directory', () => {
    const expected = {
      vehicle: {
        car: {},
        bus: {
          foo: {
            wheel: {
              steel: {
                carbon: {}
              }
            }
          }
        }
      }
    };
    DirectoryRepository.prototype.move = jest.fn(() => expected);

    const result = move('vehicle/car/wheel', 'vehicle/bus/foo');
    expect(result).toEqual(expected);
  });

  test('should fail moving a directory', () => {
    let fromPath = 'vehicle/car/wheeL/steel/carbon';
    let toPath = 'vehicle/bus/foo';
    let expectedMessage = `Cannot move ${fromPath} - incorrect path`;

    DirectoryRepository.prototype.move = jest.fn(() => {
      throw new DirectoryError(expectedMessage);
    });

    expect(move(fromPath, toPath)).toEqual(expectedMessage);

    fromPath = 'vehicle/car/wheel/steel';
    toPath = 'vehicle/bus/foo/bar';
    expectedMessage = `Cannot move ${fromPath} - bar does not exist`;
    DirectoryRepository.prototype.move = jest.fn(() => {
      throw new DirectoryNotFoundError(MOVE_ERROR, fromPath, 'bar');
    });

    expect(move(fromPath, toPath)).toEqual(expectedMessage);

    fromPath = 'vehicle/car';
    toPath = 'vehicle/airplane';
    expectedMessage = `Cannot move ${fromPath} - airplane does not exist`;
    DirectoryRepository.prototype.move = jest.fn(() => {
      throw new DirectoryNotFoundError(MOVE_ERROR, fromPath, 'airplane');
    });

    expect(move(fromPath, toPath)).toEqual(expectedMessage);
  });
});
