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

The initial directory structure you can find it at path `./assets/directory.json`. You will see that the initial value is 
```
{
           // In this case, the initial value is an empty directory.
}
```
The app gets the directory value from the js file named `directory` (kind of singleton object) located in `./assets/directory.js`, it means that `directory` has an unique instance.

At same `directory.js` location, there is another file called `instructions.txt`, it's in charge of instructions that will be executed each one by line, it can be modified giving to app whatever instruction you want, the initial value is:

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

The app is made in a MVC design patten, the controller layer, in charge of the communication between backend and the view, in this case, we don't have a proper controller layer nevertheless in `./lib/controllers` in DirectoryController class we have a function named `batch` it receives an array of each instruction as string, then it iterates and for each instruction, depending of the instruction type, it pass through his respective controller method.

The `service` layers located in `./lib/services` in charge of the business logic and the `repository` layer located in `./lib/repositories` in charge of all core CRUD operations. In this case, we don't a have a database to these operations, instead we have the singleton object, so the repository is the unique one that directly modifies the `directory` object.

Every instruction type logic has been developed with recursive methods that constantly iterate and check the each current `path` and current `target` (in this case, the singleton directory object) as params.

The app also has custom errors for grouping and handling same error types.

It's also installed ESLint for checking coding rules configured in the app, it's also installed Prettier for formatting the code style.

These 2 checks are executed in the CI pipeline along with unit tests with a coverage requirement of 85% or higher.

## Requeriments

`Node v14.x`

## Installation

### Dependencies
Run `npm install` from rootpath of the project.

| Dependencies |
|    :---:     |
|     N/A      |

| DevDependencies | Version |        Usage        |
|   :---   |   ---  |            ---               |
| jest     | 28.1.1 | Unit tests                   |
| eslint   | 8.17.0 | Code analyzer                |
| prettier | 2.6.2  | Code formatter               |

## Usage

### Input

The input file is in which the app get the data instructions to be excecuted. 

    The input is located in ./assets/instructions.txt

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

To execute the app run the command:

- `npm start`

## Test

To excecute the unit tests
- Run `npm test`

The current coverage results:

```js
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |    98.07 |     100 |     100 |                   
 lib                        |     100 |      100 |     100 |     100 |                   
  index.js                  |     100 |      100 |     100 |     100 |                   
 lib/constants              |     100 |      100 |     100 |     100 |                   
  operationTypes.js         |     100 |      100 |     100 |     100 |                   
 lib/controllers            |     100 |      100 |     100 |     100 |
  directory.js              |     100 |      100 |     100 |     100 |
 lib/errors                 |     100 |       50 |     100 |     100 |
  directoryError.js         |     100 |       50 |     100 |     100 | 5
  directoryNotFoundError.js |     100 |      100 |     100 |     100 |
 lib/repositories           |     100 |      100 |     100 |     100 |
  directory.js              |     100 |      100 |     100 |     100 |
 lib/services               |     100 |      100 |     100 |     100 |
  directory.js              |     100 |      100 |     100 |     100 |
 lib/utils                  |     100 |      100 |     100 |     100 |
  directory.js              |     100 |      100 |     100 |     100 |
 test/mocks                 |     100 |      100 |     100 |     100 |
  directory.js              |     100 |      100 |     100 |     100 |
----------------------------|---------|----------|---------|---------|-------------------

Test Suites: 7 passed, 7 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        2.202 s
Ran all test suites.
```

Enjoy :)
