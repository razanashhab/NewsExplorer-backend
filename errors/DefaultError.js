const { DEFAULT } = require('../utils/utils');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DEFAULT;
  }
}

module.exports = DefaultError;
