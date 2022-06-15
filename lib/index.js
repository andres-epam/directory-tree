const fs = require('fs');
const path = require('path');
const { INSTRUCTIONS_PATH } = require('./constants/operationTypes');
const { DirectoryController } = require('./controllers/directory');

const directoryController = new DirectoryController();

const instructions = () => {
  const url = path.join(__dirname, INSTRUCTIONS_PATH);
  const input = fs.readFileSync(url).toString();
  return input.split('\n');
};

directoryController.batch(instructions());
