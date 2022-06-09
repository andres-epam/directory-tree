const { directoryCreateDeleteInitialMock } = require('../../mocks/directory');

describe('Delete Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('should delete a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));

    const { deleteDir } = require('../../../lib/services/directory/delete');

    const expected = {
      vehicle: {
        car: {},
        bus: {}
      }
    };

    const result = deleteDir('vehicle/car/wheel');
    expect(result).toEqual(expected);
  });

  test('should fail deleting a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));
    console.log('directoryCreateDeleteInitialMock :>> ', directoryCreateDeleteInitialMock);

    const { deleteDir } = require('../../../lib/services/directory/delete');

    let path = 'vehicle/car/wheel/steel/carbon';
    let expectedMessage = `Cannot delete ${path} - carbon does not exist`;

    expect(deleteDir(path)).toEqual(expectedMessage);

    path = 'vehicle/car/wheeL/steel';
    expectedMessage = `Cannot delete ${path} - wheeL does not exist`;

    expect(deleteDir(path)).toEqual(expectedMessage);
  });
});
