const { CREATE_ERROR, MOVE_ERROR, DELETE_ERROR } = require('../../lib/constants/operationTypes');
const { DirectoryError } = require('../../lib/errors/directoryError');
const { DirectoryNotFoundError } = require('../../lib/errors/directoryNotFoundError');
const { DirectoryRepository } = require('../../lib/repositories/directory');
const { DirectoryService } = require('../../lib/services/directory');
const { listOutputMock } = require('../mocks/directory');

jest.mock('../../assets/directory', () => ({ directory: {} }));
const service = new DirectoryService();

describe('Create | Directory Service', () => {
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

    expect(service.create('fruits')).toBeDefined();
    const result = service.create('vehicle/car/wheel/steel/carbon');
    expect(result).toEqual(expected);
  });

  test('should fail creating a directory', () => {
    const path = 'vehicle/car/wheeL/steel/carbon';
    const expectedMessage = `Cannot create ${path} - wheeL does not exist`;

    DirectoryRepository.prototype.create = jest.fn(() => {
      throw new DirectoryNotFoundError(CREATE_ERROR, path, 'wheeL');
    });

    expect(service.create(path)).toEqual(expectedMessage);
  });
});

describe('List | Directory Service', () => {
  test('should list a directory', () => {
    DirectoryRepository.prototype.list = jest.fn(() => listOutputMock);

    const spy = jest.spyOn(console, 'log');
    const result = service.list();
    expect(result).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(listOutputMock);
  });
});

describe('Move | Directory Service', () => {
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

    const result = service.move('vehicle/car/wheel', 'vehicle/bus/foo');
    expect(result).toEqual(expected);
  });

  test('should fail moving a directory', () => {
    let fromPath = 'vehicle/car/wheeL/steel/carbon';
    let toPath = 'vehicle/bus/foo';
    let expectedMessage = `Cannot move ${fromPath} - incorrect path`;

    DirectoryRepository.prototype.move = jest.fn(() => {
      throw new DirectoryError(expectedMessage);
    });

    expect(service.move(fromPath, toPath)).toEqual(expectedMessage);

    fromPath = 'vehicle/car/wheel/steel';
    toPath = 'vehicle/bus/foo/bar';
    expectedMessage = `Cannot move ${fromPath} - bar does not exist`;
    DirectoryRepository.prototype.move = jest.fn(() => {
      throw new DirectoryNotFoundError(MOVE_ERROR, fromPath, 'bar');
    });

    expect(service.move(fromPath, toPath)).toEqual(expectedMessage);

    fromPath = 'vehicle/car';
    toPath = 'vehicle/airplane';
    expectedMessage = `Cannot move ${fromPath} - airplane does not exist`;
    DirectoryRepository.prototype.move = jest.fn(() => {
      throw new DirectoryNotFoundError(MOVE_ERROR, fromPath, 'airplane');
    });

    expect(service.move(fromPath, toPath)).toEqual(expectedMessage);
  });
});

describe('Delete | Directory Service', () => {
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

    const result = service.delete('vehicle/car/wheel');
    expect(result).toEqual(expected);
  });

  test('should fail deleting a directory', () => {
    let path = 'vehicle/car/wheel/steel/carbon';
    let expectedMessage = `Cannot delete ${path} - carbon does not exist`;
    DirectoryRepository.prototype.delete = jest.fn(() => {
      throw new DirectoryNotFoundError(DELETE_ERROR, path, 'carbon');
    });

    expect(service.delete(path)).toEqual(expectedMessage);

    path = 'vehicle/car/wheeL/steel';
    expectedMessage = `Cannot delete ${path} - wheeL does not exist`;
    DirectoryRepository.prototype.delete = jest.fn(() => {
      throw new DirectoryNotFoundError(DELETE_ERROR, path, 'wheeL');
    });

    expect(service.delete(path)).toEqual(expectedMessage);
  });
});
