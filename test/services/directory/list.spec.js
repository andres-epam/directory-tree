const { logger } = require('../../../lib/logger');
const { DirectoryRepository } = require('../../../lib/repositories/directory');
const { list } = require('../../../lib/services/directory');
const { listOutputMock } = require('../../mocks/directory');

jest.mock('../../../lib/directory', () => ({ directory: {} }));

describe('List Directory Service', () => {
  test('should list a directory', () => {
    DirectoryRepository.prototype.list = jest.fn(() => listOutputMock);

    const spy = jest.spyOn(logger, 'info');
    const result = list();
    expect(result).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(listOutputMock);
  });
});
