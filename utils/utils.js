const BAD_REQUEST = 400;
const NOT_AUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const DEFAULT = 500;

const BAD_REQUEST_MSG = 'Validation Error';
const NOT_AUTHORIZED_MSG = 'Not Authorized Action!';
const FORBIDDEN_MSG = 'Forbidden action!';
const NOT_FOUND_RESOURCE_MSG = 'Requested resource not found';
const NOT_FOUND_ID_MSG = 'No matching ID found';
const CONFLICT_MSG = 'Record already exist!';
const DEFAULT_MSG = 'An error occurred on the server';

module.exports = {
  BAD_REQUEST,
  NOT_AUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  DEFAULT,
  BAD_REQUEST_MSG,
  NOT_AUTHORIZED_MSG,
  FORBIDDEN_MSG,
  NOT_FOUND_RESOURCE_MSG,
  NOT_FOUND_ID_MSG,
  CONFLICT_MSG,
  DEFAULT_MSG,
};
