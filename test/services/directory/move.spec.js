const { directoryMoveInitialSuccessMock, directoryMoveInitialFailMock } = require('../../mocks/directory');

describe('Move Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should move a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...directoryMoveInitialSuccessMock
      }
    }));

    const { move } = require('../../../lib/services/directory/move');

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

    const result = move('vehicle/car/wheel', 'vehicle/bus/foo');
    expect(result).toEqual(expected);
  });

  test('should fail creating a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...directoryMoveInitialFailMock
      }
    }));
    const { move } = require('../../../lib/services/directory/move');

    let fromPath = 'vehicle/car/wheeL/steel/carbon';
    let toPath = 'vehicle/bus/foo';
    let expectedMessage = `Cannot move ${fromPath} - incorrect path`;
    expect(move(fromPath, toPath)).toEqual(expectedMessage);

    fromPath = 'vehicle/car/wheel/steel';
    toPath = 'vehicle/bus/foo/bar';
    expectedMessage = `Cannot move ${fromPath} - bar does not exist`;
    expect(move(fromPath, toPath)).toEqual(expectedMessage);
  });
});
