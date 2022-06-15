const { directoryFromFile } = require('./mocks/directory');

jest.doMock('../assets/directory.json', () => directoryFromFile);

describe('Directory Source', () => {
  test('Should get info from file', () => {
    const { directory } = require('../lib/directory');
    expect(directory).toEqual(directoryFromFile);
  });
});
