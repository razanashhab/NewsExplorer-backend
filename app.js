const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '27017',
  DB_DATABASE = 'newsexplorerdb',
} = process.env;
const app = express();
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middleware/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);

app.use(requestLogger);

app.use(cors());
app.options('*', cors()); // enable requests for all routes

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', require('./routes'));

app.use((req, res) => {
  throw new NotFoundError('Requested resource not found');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
