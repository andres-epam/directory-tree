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
