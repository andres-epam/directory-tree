exports.directoryCreateDeleteInitialMock = {
  vehicle: {
    car: {
      wheel: {
        steel: {}
      }
    },
    bus: {}
  }
};

exports.directoryMoveInitialSuccessMock = {
  vehicle: {
    car: {
      wheel: {
        steel: {
          carbon: {}
        }
      }
    },
    bus: {
      foo: {}
    }
  }
};

exports.directoryMoveInitialFailMock = {
  vehicle: {
    car: {
      wheel: {
        steel: {}
      }
    },
    bus: {
      foo: {}
    }
  }
};

exports.directoryFromFile = {
  foods: {
    fruits: {
      watermelon: {}
    },
    grains: {},
    vegetables: {
      squash: {}
    }
  }
};

exports.directoryListMock = {
  foods: {
    grains: {},
    fruits: {
      apples: {
        fuji: {}
      }
    },
    vegetables: {
      squash: {}
    }
  }
};

exports.directorySortedListMock = {
  foods: {
    fruits: {
      apples: {
        fuji: {}
      }
    },
    grains: {},
    vegetables: {
      squash: {}
    }
  }
};

exports.instructionsMock = `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
DELETE fruits`;

exports.listOutputMock =
  'foods\r\n' + ' fruits\r\n' + '  apples\r\n' + '   fuji\r\n' + ' grains\r\n' + ' vegetables\r\n' + '  squash';

exports.instructionsParsedMock = [
  'CREATE fruits\r',
  'CREATE vegetables\r',
  'CREATE grains\r',
  'CREATE fruits/apples\r',
  'CREATE fruits/apples/fuji\r',
  'LIST\r',
  'CREATE grains/squash\r',
  'MOVE grains/squash vegetables\r',
  'CREATE foods\r',
  'MOVE grains foods\r',
  'MOVE fruits foods\r',
  'MOVE vegetables foods\r',
  'LIST\r',
  'DELETE fruits/apples\r',
  'DELETE foods/fruits/apples\r',
  'LIST'
];

exports.instructionsParsedFailMock = [
  'CREATE fruits\r',
  'CREATE vegetables\r',
  'CREATE grains\r',
  'CREATE fruits/apples\r',
  'CREATE fruits/apples/fuji\r',
  'LIST\r',
  'CREATE grains/squash\r',
  'MOVE grains/squash vegetables\r',
  'CREATE foods\r',
  'UPDATE grains foods\r',
  'MOVE fruits foods\r',
  'MOVE vegetables foods\r',
  'LIST\r',
  'DELETE fruits/apples\r',
  'DELETE foods/fruits/apples\r',
  'LIST'
];
