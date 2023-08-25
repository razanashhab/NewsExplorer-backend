const { NOT_AUTHORIZED } = require('../utils/utils');

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED;
  }
}

module.exports = NotAuthorizedError;
