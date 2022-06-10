jest.mock('../lib/server', () => ({}));
describe('App Core', () => {
  test('should init', () => {
    require('../lib');
  });
});
