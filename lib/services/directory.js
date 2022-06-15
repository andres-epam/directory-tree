const { DirectoryRepository } = require('../repositories/directory');

class DirectoryService {
  constructor() {
    this.repository = new DirectoryRepository();
  }

  create(path) {
    try {
      console.log(`CREATE ${path}`);

      return this.repository.create(path);
    } catch (e) {
      console.error(e.message);

      return e.message;
    }
  }

  list() {
    console.log('LIST');
    return this.repository.list();
  }

  move(fromPath, toPath) {
    try {
      console.log(`MOVE ${fromPath} ${toPath}`);

      return this.repository.move(fromPath, toPath);
    } catch (e) {
      console.error(e.message);

      return e.message;
    }
  }

  delete(path) {
    try {
      console.log(`DELETE ${path}`);

      return this.repository.delete(path);
    } catch (e) {
      console.error(e.message);

      return e.message;
    }
  }
}

module.exports = {
  DirectoryService
};
