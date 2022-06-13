const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { CREATE, LIST, MOVE, DELETE } = require('../constants/operationTypes');
const { create, list, move, deleteDir } = require('../services/directory');

let input;
let instructions;

const getInstructions = () => {
  const url = path.join(__dirname, '../../', config.instructionsPath);
  input = fs.readFileSync(url).toString();
  instructions = input.split('\n');
};

const executeInstructions = () => {
  instructions.forEach(instruction => {
    const params = instruction.split(' ');
    const type = params[0].replace(/\n|\r/g, '');
    const path1 = params[1] ? params[1].replace(/\n|\r/g, '') : undefined;
    const path2 = params[2] ? params[2].replace(/\n|\r/g, '') : undefined;

    switch (type) {
      case CREATE:
        create(path1);
        break;
      case LIST:
        list();
        break;
      case MOVE:
        move(path1, path2);
        break;
      case DELETE:
        deleteDir(path1);
        break;
      default:
        console.error(`Operation ${type} not found`);
        break;
    }
  });
};

getInstructions();
executeInstructions();
