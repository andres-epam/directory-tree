const { directoryCreateDeleteInitialMock } = require('../../mocks/directory');

describe('Create Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('should create a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));

    const { create } = require('../../../lib/services/directory/create');

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

    expect(create('fruits')).toBeDefined();
    const result = create('vehicle/car/wheel/steel/carbon');
    expect(result).toEqual(expected);
  });

  test('should fail creating a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryCreateDeleteInitialMock))
      }
    }));
    const { create } = require('../../../lib/services/directory/create');

    const path = 'vehicle/car/wheeL/steel/carbon';
    const expectedMessage = `Cannot create ${path} - wheeL does not exist`;

    expect(create(path)).toEqual(expectedMessage);
  });
});
