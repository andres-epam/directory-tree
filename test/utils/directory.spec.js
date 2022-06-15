const { CREATE_ERROR, MOVE_ERROR, DELETE_ERROR } = require('../../lib/constants/operationTypes');
const { DirectoryNotFoundError } = require('../../lib/errors/directoryNotFoundError');
const { findValueFromPath, sortObject, iterValidations } = require('../../lib/utils/directory');
const { directoryListMock, directorySortedListMock } = require('../mocks/directory');

describe('Directory Utils', () => {
  test('should find a target by a given path', () => {
    const path = 'foods/fruits/apples';
    const result = findValueFromPath(path, directoryListMock);

    expect(result).toEqual(directoryListMock.foods.fruits.apples);
  });

  test('should return undefined when not find a target by path', () => {
    const path = 'foods/fruits/appleS';
    const result = findValueFromPath(path, directoryListMock);

    expect(result).not.toBeDefined();
  });

  test('should sort an object', () => {
    const result = sortObject(directoryListMock);
    expect(result).toEqual(directorySortedListMock);
  });
});

describe('IterValidations | Directory Utils', () => {
  let originPath;
  let currentDir;
  let path;
  let currentTarget;
  let currentObjectLocation;

  test('should find to create a directory by given path', () => {
    originPath = 'foods/fruits/pears';
    currentDir = 'pears';
    path = 'pears';
    currentTarget = JSON.parse(JSON.stringify(directoryListMock.foods.fruits));
    currentObjectLocation = currentTarget[currentDir];

    const expected = {
      ...directoryListMock.foods.fruits,
      pears: {}
    };

    const params = {
      path,
      target: currentTarget,
      originPath,
      currentDir,
      currentObjectLocation
    };
    iterValidations.create(params);
    expect(currentTarget).toEqual(expected);
  });

  test('should throw and error if path for directory to create not exist', () => {
    originPath = 'foods/fruits/pears';
    currentDir = 'pears';
    path = 'fruits/pears';
    currentTarget = JSON.parse(JSON.stringify(directoryListMock.foods.fruits));
    currentObjectLocation = currentTarget[currentDir];

    const params = {
      path,
      target: currentTarget,
      originPath,
      currentDir,
      currentObjectLocation
    };

    const expectedErrorMessage = `Cannot ${CREATE_ERROR} ${originPath} - ${currentDir} does not exist`;
    const expectedError = new DirectoryNotFoundError(CREATE_ERROR, originPath, currentDir);

    expect(() => iterValidations.create(params)).toThrow(DirectoryNotFoundError);
    expect(() => iterValidations.create(params)).toThrow(expectedErrorMessage);
    expect(() => iterValidations.create(params)).toThrow(expectedError);
  });

  test('should display tabulated current directory from key target', () => {
    currentTarget = JSON.parse(JSON.stringify(directoryListMock));

    let key = 'apples';
    let expected = '  apples';
    let result = iterValidations.list(currentTarget, key);

    expect(result).toEqual(expected);

    key = 'fuji';
    expected = '   fuji';
    result = iterValidations.list(currentTarget, key);

    expect(result).toEqual(expected);

    key = 'vegetables';
    expected = ' vegetables';
    result = iterValidations.list(currentTarget, key);

    expect(result).toEqual(expected);

    key = 'foods';
    expected = 'foods';
    result = iterValidations.list(currentTarget, key);

    expect(result).toEqual(expected);
  });

  test('should find to move a directory by given path', () => {
    path = 'vegetables';
    currentDir = 'vegetables';
    originPath = 'foods/fruits';
    currentTarget = JSON.parse(JSON.stringify(directoryListMock.foods));
    currentObjectLocation = currentTarget[currentDir];
    const targetToCopy = JSON.parse(JSON.stringify(directoryListMock.foods.fruits));

    const expected = {
      ...currentTarget,
      vegetables: {
        ...currentTarget.vegetables,
        ...targetToCopy
      }
    };

    const params = {
      toPath: path,
      target: currentTarget,
      originFromPath: originPath,
      targetToCopy,
      currentDir,
      currentObjectLocation
    };

    iterValidations.move(params);

    expect(currentTarget).toEqual(expected);
  });

  test('should throw and error if path for directory to move not exist', () => {
    path = 'pears';
    currentDir = 'pears';
    originPath = 'foods/fruits/pears';
    currentTarget = JSON.parse(JSON.stringify(directoryListMock.foods.fruits));
    currentObjectLocation = currentTarget[currentDir];
    const targetToCopy = JSON.parse(JSON.stringify(directoryListMock.foods.vegetables));

    const params = {
      toPath: path,
      target: currentTarget,
      originFromPath: originPath,
      targetToCopy,
      currentDir,
      currentObjectLocation
    };

    const expectedErrorMessage = `Cannot ${MOVE_ERROR} ${originPath} - ${currentDir} does not exist`;
    const expectedError = new DirectoryNotFoundError(MOVE_ERROR, originPath, currentDir);

    expect(() => iterValidations.move(params)).toThrow(DirectoryNotFoundError);
    expect(() => iterValidations.move(params)).toThrow(expectedErrorMessage);
    expect(() => iterValidations.move(params)).toThrow(expectedError);
  });

  test('should find to delete a directory by given path', () => {
    originPath = 'foods/fruits';
    currentDir = 'fruits';
    path = 'fruits';
    currentTarget = JSON.parse(JSON.stringify(directoryListMock.foods));
    currentObjectLocation = currentTarget[currentDir];
    const originTarget = JSON.parse(JSON.stringify(directoryListMock.foods));

    const expected = {
      ...currentTarget,
      fruits: undefined
    };

    const params = {
      path,
      target: currentTarget,
      originPath,
      currentDir,
      currentObjectLocation,
      originTarget
    };
    iterValidations.delete(params);

    expect(currentTarget).toEqual(expected);
  });

  test('should throw and error if path for directory to delete not exist', () => {
    path = 'fruits/pears';
    currentTarget = JSON.parse(JSON.stringify(directoryListMock.foods.fruits));
    originPath = 'foods/fruits/pears';
    const originTarget = JSON.parse(JSON.stringify(directoryListMock));
    currentDir = 'pears';
    currentObjectLocation = currentTarget[currentDir];

    const params = {
      path,
      target: currentTarget,
      originPath,
      currentDir,
      currentObjectLocation,
      originTarget
    };

    const expectedErrorMessage = `Cannot ${DELETE_ERROR} ${originPath} - ${currentDir} does not exist`;
    const expectedError = new DirectoryNotFoundError(DELETE_ERROR, originPath, currentDir);

    expect(() => iterValidations.delete(params)).toThrow(DirectoryNotFoundError);
    expect(() => iterValidations.delete(params)).toThrow(expectedErrorMessage);
    expect(() => iterValidations.delete(params)).toThrow(expectedError);
  });
});
