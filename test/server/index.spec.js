const { instructionsMock } = require('../mocks/directory');

describe('Server Init', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('should init', () => {
    jest.doMock('fs', () => ({
      readFileSync: jest.fn(() => Buffer.from(instructionsMock))
    }));
    jest.doMock('../../lib/services/directory', () => ({
      create: jest.fn(() => ({})),
      deleteDir: jest.fn(() => ({})),
      move: jest.fn(() => ({})),
      list: jest.fn(() => ({}))
    }));
    require('../../lib/server');
  });

  test('should gives an unknown operation', () => {
    jest.doMock('fs', () => ({
      readFileSync: jest.fn(() => Buffer.from('UPDATE foo'))
    }));
    jest.doMock('../../lib/services/directory', () => ({
      create: jest.fn(() => ({})),
      deleteDir: jest.fn(() => ({})),
      move: jest.fn(() => ({})),
      list: jest.fn(() => ({}))
    }));

    const spy = jest.spyOn(console, 'error');
    require('../../lib/server');
    expect(spy).toHaveBeenCalled();
  });
});
