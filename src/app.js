/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');
const logger = require('morgan');
const debug = require('debug')('xinef');
const httpStatus = require('http-status');
const settings = require('./settings.json');
const apiResponse = require('./utils/apiresponse');

const app = express();

// Middleware

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));

const view = require('./view');

// view engine setup
app
// Información de aplicación
  .use(express.Router()
    .get('/$', view.index)
    .get('/status', view.status));

// Module loading using settings.
// eslint-disable-next-line no-restricted-syntax
for (const dmodule of settings.modules) {
  app.use(dmodule.url, require(dmodule.name));
}

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json(apiResponse.error(
    httpStatus.NOT_FOUND,
    httpStatus.NOT_FOUND,
    httpStatus[httpStatus.NOT_FOUND],
    'The Page cannot be found',
  ));
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  debug(err);
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status);
  res.json(apiResponse.error(status, status, err.message, req.app.get('env') === 'development' ? err : {}));
});

module.exports = app;
