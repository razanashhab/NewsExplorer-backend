const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const {
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_DATABASE_DEV,
} = require('./configuration/configuration');

const {
  DB_HOST = DB_HOST_DEV,
  DB_PORT = DB_PORT_DEV,
  DB_DATABASE = DB_DATABASE_DEV,
} = process.env;
const app = express();

const { requestLogger, errorLogger } = require('./middleware/logger');
const { rateLimiterUsingThirdParty } = require('./middleware/rateLimiter');
const NotFoundError = require('./errors/NotFoundError');
const { NOT_FOUND_RESOURCE_MSG } = require('./utils/utils');
const errorHandler = require('./middleware/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);

app.use(requestLogger);
app.use(rateLimiterUsingThirdParty);
app.use(helmet());

app.use(cors());
app.options('*', cors()); // enable requests for all routes

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', require('./routes'));

app.use((req, res) => {
  throw new NotFoundError(NOT_FOUND_RESOURCE_MSG);
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
