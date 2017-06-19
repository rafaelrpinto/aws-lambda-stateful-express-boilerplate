var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const AWS = require('aws-sdk');
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')({ session });
const index = require('./routes/index');

const app = express();

// helmet basic setup
app.use(helmet());

// Common session options
let sessionOptions = {
  secret: 'eVaRuaCnYvWBKUbNWxJsUBwCgzzKManPgUoRcjQfysfVtZmDSsLHuekcWNniTCwt',
  cookie: {
    sameSite: true,
    secure: false, //api gateway makes ssl offloading so express only sees http
    maxAge: 600000
  },
  resave: true,
  saveUninitialized: false
};

if (app.get('env') === 'development') {
  // local dynamo session store
  sessionOptions = _extends({}, sessionOptions, {
    store: new DynamoDBStore({
      table: 'local-sessions',
      client: new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000'), region: 'us-east-1' })
    }),
    cookie: {}
  });
} else {
  // production session store config
  sessionOptions = _extends({}, sessionOptions, {
    store: new DynamoDBStore({
      table: 'express-sessions',
      reapInterval: 601000,
      readCapacityUnits: 10,
      writeCapacityUnits: 10,
      AWSConfigJSON: {
        region: 'eu-west-2'
      }
    })
  });
}

// session middleware
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, '../lib/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;