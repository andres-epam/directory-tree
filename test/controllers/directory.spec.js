const {
  directoryCreateDeleteInitialMock,
  directoryListMock,
  directoryMoveInitialFailMock,
  instructionsParsedMock,
  instructionsParsedFailMock
} = require('../mocks/directory');

describe('Server Init', () => {
  let controller;
  beforeAll(() => {
    jest.doMock('../../lib/services/directory', () => ({
      DirectoryService: function () {
        this.create = () => directoryCreateDeleteInitialMock;
        this.list = () => directoryListMock;
        this.move = () => directoryMoveInitialFailMock;
        this.delete = () => directoryCreateDeleteInitialMock;
      }
    }));
  });

  beforeEach(() => {
    jest.resetModules();
    controller = new (require('../../lib/controllers/directory').DirectoryController)();
  });

  test('should create a directory', () => {
    expect(controller.create()).toEqual(directoryCreateDeleteInitialMock);
  });

  test('should list a directory', () => {
    expect(controller.list()).toEqual(directoryListMock);
  });

  test('should move a directory', () => {
    expect(controller.move()).toEqual(directoryMoveInitialFailMock);
  });

  test('should delete a directory', () => {
    expect(controller.delete()).toEqual(directoryCreateDeleteInitialMock);
  });

  test('should do directory operations in batch', () => {
    const spy = jest.spyOn(console, 'error');

    expect(controller.batch(instructionsParsedMock)).toBeUndefined();
    expect(spy).not.toHaveBeenCalled();
  });

  test('should logs an error by an unknown operation', () => {
    const spy = jest.spyOn(console, 'error');

    const expectedLogMessage = 'Operation UPDATE not found';
    expect(controller.batch(instructionsParsedFailMock)).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expectedLogMessage);
  });
});
