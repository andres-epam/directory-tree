const { directoryFromFile } = require('../mocks/directory');

jest.doMock('fs', () => ({ readFileSync: jest.fn(() => Buffer.from(JSON.stringify(directoryFromFile))) }));

describe('Directory Source', () => {
  test('Should get info from file', () => {
    const { directory } = require('../../lib/directory');
    expect(directory).toEqual(directoryFromFile);
  });
});
