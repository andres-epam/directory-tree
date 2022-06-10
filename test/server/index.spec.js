jest.mock('fs', () => ({
  readFileSync: jest.fn(() =>
    Buffer.from(`CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
DELETE fruits`)
  )
}));

jest.mock('../../lib/services/directory', () => ({
  create: jest.fn(() => ({})),
  deleteDir: jest.fn(() => ({})),
  move: jest.fn(() => ({})),
  list: jest.fn(() => ({}))
}));

describe('Server Init', () => {
  test('should init', () => {
    require('../../lib/server');
  });
});
