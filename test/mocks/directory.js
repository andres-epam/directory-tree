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
