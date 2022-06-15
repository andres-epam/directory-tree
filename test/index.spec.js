const { instructionsMock } = require('./mocks/directory');

describe('Server Init', () => {
  let controllerSpy;
  beforeAll(() => {
    controllerSpy = jest
      .mock('../lib/controllers/directory', () => ({
        DirectoryController: function () {
          this.create = () => {};
          this.list = () => {};
          this.move = () => {};
          this.delete = () => {};
          this.batch = () => ({ holi: {} });
        }
      }))
      .spyOn(require('../lib/controllers/directory'), 'DirectoryController');
  });

  test('should init', () => {
    jest.doMock('fs', () => ({
      readFileSync: jest.fn(() => Buffer.from(instructionsMock))
    }));
    const readFileSyncSpy = jest.spyOn(require('fs'), 'readFileSync');

    require('../lib');

    expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(readFileSyncSpy).toReturnWith(Buffer.from(instructionsMock));
    expect(controllerSpy).toHaveBeenCalledTimes(1);
  });
});
