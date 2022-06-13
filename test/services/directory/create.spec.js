const { CREATE_ERROR } = require('../../../lib/constants/operationTypes');
const { DirectoryNotFoundError } = require('../../../lib/errors/directory');
const { DirectoryRepository } = require('../../../lib/repositories/directory');
const { create } = require('../../../lib/services/directory');

jest.mock('../../../lib/directory', () => ({ directory: {} }));

describe('Create Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should create a directory', () => {
    const expected = {
      fruits: {},
      vehicle: {
        car: {
          wheel: {
            steel: {
              carbon: {}
            }
          }
        },
        bus: {}
      }
    };

    DirectoryRepository.prototype.create = jest.fn(() => expected);

    expect(create('fruits')).toBeDefined();
    const result = create('vehicle/car/wheel/steel/carbon');
    expect(result).toEqual(expected);
  });

  test('should fail creating a directory', () => {
    const path = 'vehicle/car/wheeL/steel/carbon';
    const expectedMessage = `Cannot create ${path} - wheeL does not exist`;

    DirectoryRepository.prototype.create = jest.fn(() => {
      throw new DirectoryNotFoundError(CREATE_ERROR, path, 'wheeL');
    });

    expect(create(path)).toEqual(expectedMessage);
  });
});
