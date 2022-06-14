# Directory tree

[![build-test](https://github.com/andres-epam/directory-tree/actions/workflows/ci.yml/badge.svg)](https://github.com/andres-epam/directory-tree/actions/workflows/ci.yml)


## Analysis and Solution

Based on challenge requirements, I decided that a JSON would be who was going to emulate the directory functionality since we shouldn't create real folders directory on our host machine.

So, an example of directory as:

    foods        
    ├── fruits
    |    ├── apples
    |       └── fuji
    ├── grains                                                
    └── vegetables
        └── squash
        
In JSON representation I imagined it as:
```json
{
  "foods": {
    "fruits": {
      "apples": {
        "fuji": {}
      }
    },
    "grains": {},
    "vegetables": {
      "squash": {}
    }
  }
}
```

The initial directory structure you can find it at path `./directories/<environment>/directory.txt`. You will see that the initial value is 
```
{
                // In this case, the initial value is an empty directory.
}
```
The app reads the directory initial value from the text file, then converts it in a singleton object named `directory` located in `./lib/directory`, it means that `directory` has an unique instance.

At same directory.txt location, there is another text file called `instructions.txt`, it's in charge of instructions that will be executed each one by line, it can be modified giving to app whatever instruction you want, the initial value is:

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

I interpreted each instruction line as a HTTP request in which `CREATE`, `LIST`, `LIST`, `DELETE` would be as `POST`, `GET`, `PATH/PUT` and `DELETE` HTTP request methods, so we can say that the app do calls in batch.

The app is made in a MVC design patten, the controller layer, in charge of the communication between backend and the view, in this case, we don't have a proper controller layer nevertheless in `./lib/server` we have a function called `executeInstructions` that apply `controller` functionality, it receives each instruction, then depending of the instruction type, it pass through his respective service method.

The `service` layers located in `./lib/services/directory` in charge of the business logic and the `repository` layer located in `./lib/repository/directory` in charge of all core CRUD operations. In this case, we don't a have a database to these operations, instead we have the singleton object, so the repository is the unique one that directly modifies the `directory` singleton object.

Every instruction type has been developed with recursive methods that constantly iterate and check the each given directory `path` with the singleton also called `target` as param. 
The app also has custom errors for grouping and handling same error types.

Analyzing in a real production app, it manages `DEV`, `QA` and `PROD` environments, we can set configurations for every environment in `./config/<environment>`, then just set the env variable `NODE_ENV` to `development`, `testing` or `production` in `.env` to adapt the configurations;

The app integrates a logging system by Winston dependency, if app is on `prod` environment, then the format changes configured to that environment.

Example log format in `dev`/`qa` environments:
```js
INFO: CREATE foods/fruits/pears
```
Example log format in `prod` environment:

```js
CREATE foods/fruits/pears
```

It's installed ESLint for checking rules configured in the app, it's also installed Prettier for checking the code format/styling.

These 2 checks are executed in the CI pipeline along with unit tests with a coverage requirement of 80% or higher.

## Requeriments

`Node v14.x`

## Installation

### Dependencies
Run `npm install` from rootpath of the project.

| Dependencies | Version | Usage |  |
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
The output for the default input would be like the following (prod env):

```js
CREATE fruits
CREATE vegetables        
CREATE grains
CREATE fruits/apples     
CREATE fruits/apples/fuji
LIST
fruits
 apples
  fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
 fruits
  apples
   fuji
 grains
 vegetables
  squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
 fruits
 grains
 vegetables
  squash
```

To execute the app, there are 3 ways to do it, feel free to use any you want:

- `npm start`
- `node directories.js`
- `./start.sh`

## Test

To excecute the unit tests
- Set `NODE_ENV` environment variable to `testing`
- Run `npm run test:dev`

The current coverage results:

```js
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |    98.24 |     100 |     100 |                   
 lib                        |     100 |      100 |     100 |     100 |                   
  index.js                  |     100 |      100 |     100 |     100 |                   
 lib/constants              |     100 |      100 |     100 |     100 |                   
  operationTypes.js         |     100 |      100 |     100 |     100 |                   
 lib/directory              |     100 |      100 |     100 |     100 |                   
  index.js                  |     100 |      100 |     100 |     100 | 
 lib/errors/directory       |     100 |       50 |     100 |     100 | 
  directory.js              |     100 |       50 |     100 |     100 | 5
  directoryNotFound.js      |     100 |      100 |     100 |     100 | 
  index.js                  |     100 |      100 |     100 |     100 | 
 lib/repositories/directory |     100 |      100 |     100 |     100 | 
  directory.js              |     100 |      100 |     100 |     100 | 
  index.js                  |     100 |      100 |     100 |     100 | 
 lib/server                 |     100 |      100 |     100 |     100 | 
  index.js                  |     100 |      100 |     100 |     100 | 
 lib/services/directory     |     100 |      100 |     100 |     100 | 
  create.js                 |     100 |      100 |     100 |     100 | 
  delete.js                 |     100 |      100 |     100 |     100 | 
  index.js                  |     100 |      100 |     100 |     100 | 
  list.js                   |     100 |      100 |     100 |     100 | 
  move.js                   |     100 |      100 |     100 |     100 | 
 lib/utils                  |     100 |      100 |     100 |     100 | 
  directory.js              |     100 |      100 |     100 |     100 | 
  index.js                  |     100 |      100 |     100 |     100 | 
 test/mocks                 |     100 |      100 |     100 |     100 | 
  directory.js              |     100 |      100 |     100 |     100 | 
----------------------------|---------|----------|---------|---------|-------------------

Test Suites: 11 passed, 11 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        4.317 s
Ran all test suites.
```

Enjoy :)
