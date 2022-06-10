const { directoryListMock } = require('../../mocks/directory');

describe('Create Directory Service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should create a directory', () => {
    jest.doMock('../../../lib/directory', () => ({
      directory: {
        ...JSON.parse(JSON.stringify(directoryListMock))
      }
    }));
    const spy = jest.spyOn(console, 'log');
    const { list } = require('../../../lib/services/directory');
    expect(list()).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });
});
