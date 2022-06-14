const { CREATE_ERROR, MOVE_ERROR, DELETE_ERROR } = require('../../../lib/constants/operationTypes');
const { DirectoryError, DirectoryNotFoundError } = require('../../../lib/errors/directory');
const {
  directoryCreateDeleteInitialMock,
  directoryListMock,
  directoryMoveInitialSuccessMock,
  directoryMoveInitialFailMock,
  listOutputMock
} = require('../../mocks/directory');

describe('Create | Directory Repository', () => {
  let repository;

  beforeEach(() => {
    jest.resetModules();
  });

  test('should create a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));

    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();

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

    expect(repository.create('fruits')).toBeDefined();
    const result = repository.create('vehicle/car/wheel/steel/carbon');
    expect(result).toEqual(expected);
  });

  test('should fail creating a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));
    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();

    const path = 'vehicle/car/wheeL/steel/carbon';
    const expectedError = new DirectoryNotFoundError(CREATE_ERROR, path, 'wheeL');

    expect(() => repository.create(path)).toThrow(expectedError);
  });
});

describe('List | Directory Repository', () => {
  let repository;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryListMock))
      }
    }));
    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();
  });

  test('should list a sorted directory', () => {
    expect(repository.list()).toEqual(listOutputMock);
  });
});

describe('Move | Directory Repository', () => {
  let repository;

  beforeEach(() => {
    jest.resetModules();
  });

  test('should move a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...directoryMoveInitialSuccessMock
      }
    }));

    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();

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

    const result = repository.move('vehicle/car/wheel', 'vehicle/bus/foo');
    expect(result).toEqual(expected);
  });

  test('should fail moving a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...directoryMoveInitialFailMock
      }
    }));
    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();

    let fromPath = 'vehicle/car/wheeL/steel/carbon';
    let toPath = 'vehicle/bus/foo';
    let expectedError = new DirectoryError(`Cannot move ${fromPath} - incorrect path`);

    expect(() => repository.move(fromPath, toPath)).toThrow(expectedError);

    fromPath = 'vehicle/car/wheel/steel';
    toPath = 'vehicle/bus/foo/bar';
    expectedError = new DirectoryNotFoundError(MOVE_ERROR, fromPath, 'bar');

    expect(() => repository.move(fromPath, toPath)).toThrow(expectedError);

    fromPath = 'vehicle/car';
    toPath = 'vehicle/airplane';
    expectedError = new DirectoryNotFoundError(MOVE_ERROR, fromPath, 'airplane');

    expect(() => repository.move(fromPath, toPath)).toThrow(expectedError);
  });
});

describe('Delete | Directory Repository', () => {
  let repository;

  beforeEach(() => {
    jest.resetModules();
  });
  test('should delete a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));

    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();

    const expected = {
      vehicle: {
        car: {},
        bus: {}
      }
    };

    const result = repository.delete('vehicle/car/wheel');
    expect(result).toEqual(expected);
  });

  test('should fail deleting a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));

    const { DirectoryRepository } = require('../../../lib/repositories/directory');
    repository = new DirectoryRepository();

    let path = 'vehicle/car/wheel/steel/carbon';
    let expectedError = new DirectoryNotFoundError(DELETE_ERROR, path, 'carbon');

    expect(() => repository.delete(path)).toThrow(expectedError);

    path = 'vehicle/car/wheeL/steel';
    expectedError = new DirectoryNotFoundError(DELETE_ERROR, path, 'wheeL');

    expect(() => repository.delete(path)).toThrow(expectedError);
  });
});
