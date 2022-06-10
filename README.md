# Directory tree

[![build-test](https://github.com/andres-epam/directory-tree/actions/workflows/ci.yml/badge.svg)](https://github.com/andres-epam/directory-tree/actions/workflows/ci.yml)

## Requeriments

`Node v14.x`

## Installation

### Dependencies
Run `npm install` from rootpath of the project.

| Dependencies | version | Usage |  |
| --- | --- |  --- | --- | 
| `winston` | ^3.7.2 | Logs the output |

### Environment variables
Create `.env` in root and copy the following environment variables:
```js
NODE_ENV=development
DIRECTORY_PARENT_PATH=/directories
DIRECTORY_FILENAME=directory.txt
INSTRUCTIONS_FILENAME=instructions.txt
TIMEZONE=
LOCALE_TIME=
```
or just rename the `.env.example` located in the root.

## Usage

### Input

The input file is in which the app get the data instructions to be excecuted. 

    The input is located in `./directories/<environment>/instructions.txt`

The default input is: 
```js
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
```
The output for the default input would be like the following:

```js
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: Started! 
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE fruits 
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE vegetables         
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE grains 
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE fruits/apples      
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE fruits/apples/fuji 
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: LIST 

  fruits 
    apples
      fuji

  
  vegetables
  grains

[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE grains/squash
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: MOVE grains/squash vegetables
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: CREATE foods
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: MOVE grains foods
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: MOVE fruits foods
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: MOVE vegetables foods
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: LIST

  foods
    grains
    fruits
      apples
        fuji


    vegetables
      squash



[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: DELETE fruits/apples
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> ERROR: Cannot delete fruits/apples - fruits does not exist
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: DELETE foods/fruits/apples
[LOG] -> 06/10/2022, 06:33:30 GMT-5 ----------> INFO: LIST

  foods
    grains
    fruits
    vegetables
      squash
```

To execute the app, there are 3 ways to do it, feel free to use any you want:

- `npm start`
- `node directories.js`
- `./start.sh`

## Test

To excecute the unit tests run `npm run test:dev`

The current coverage results:

```ts
------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   97.17 |    94.64 |     100 |   97.09 | 
 lib                    |     100 |      100 |     100 |     100 | 
  index.js              |     100 |      100 |     100 |     100 | 
 lib/constants          |     100 |      100 |     100 |     100 | 
  operationTypes.js     |     100 |      100 |     100 |     100 | 
 lib/directory          |     100 |      100 |     100 |     100 | 
  index.js              |     100 |      100 |     100 |     100 | 
 lib/logger             |   84.21 |       50 |     100 |   82.35 | 
  index.js              |   84.21 |       50 |     100 |   82.35 | 29-31
 lib/server             |   92.85 |    88.88 |     100 |   92.85 | 
  index.js              |   92.85 |    88.88 |     100 |   92.85 | 37-38
 lib/services/directory |     100 |      100 |     100 |     100 | 
  create.js             |     100 |      100 |     100 |     100 | 
  delete.js             |     100 |      100 |     100 |     100 | 
  index.js              |     100 |      100 |     100 |     100 | 
  list.js               |     100 |      100 |     100 |     100 | 
  move.js               |     100 |      100 |     100 |     100 | 
 lib/util               |     100 |      100 |     100 |     100 | 
  directory.js          |     100 |      100 |     100 |     100 | 
 test/mocks             |     100 |      100 |     100 |     100 | 
  directory.js          |     100 |      100 |     100 |     100 | 
------------------------|---------|----------|---------|---------|-------------------

Test Suites: 7 passed, 7 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        2.327 s
Ran all test suites.
```

Enjoy :)