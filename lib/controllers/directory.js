const { CREATE, LIST, MOVE, DELETE } = require('../constants/operationTypes');
const { DirectoryService } = require('../services/directory');

class DirectoryController {
  constructor() {
    this.service = new DirectoryService();
  }

  create(path) {
    return this.service.create(path);
  }

  list() {
    return this.service.list();
  }

  move(fromPath, toPath) {
    return this.service.move(fromPath, toPath);
  }

  delete(path) {
    return this.service.delete(path);
  }

  batch(instructions) {
    instructions.forEach(instruction => {
      const params = instruction.split(' ');
      const endOfLineChars = /\n|\r/g;

      const type = params[0].replace(endOfLineChars, '');
      const path1 = params[1] ? params[1].replace(endOfLineChars, '') : undefined;
      const path2 = params[2] ? params[2].replace(endOfLineChars, '') : undefined;

      switch (type) {
        case CREATE:
          this.create(path1);
          break;
        case LIST:
          this.list();
          break;
        case MOVE:
          this.move(path1, path2);
          break;
        case DELETE:
          this.delete(path1);
          break;
        default:
          console.error(`Operation ${type} not found`);
          break;
      }
    });
  }
}

module.exports = {
  DirectoryController
};
