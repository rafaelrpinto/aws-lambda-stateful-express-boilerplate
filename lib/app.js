const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const csrf = require('csurf');
const AWS = require('aws-sdk');
const session = require('express-session');
const DynamoDBStore = require('connect-dynamodb')({session});
const index = require('./routes/index');

const app = express();

// trust proxy headers
app.set('trust proxy', true);

// helmet basic setup
app.use(helmet());

// Common session options
let sessionOptions = {
  name: 'aCookie',
  secret: 'eVaRuaCnYvWBKUbNWxJsUBwCgzzKManPgUoRcjQfysfVtZmDSsLHuekcWNniTCwt',
  cookie: {
    sameSite: true,
    secure: true,
    maxAge: 600000
  },
  resave: true,
  saveUninitialized: false
};

if (app.get('env') === 'development') {
  // local dynamo session store
  sessionOptions = {
    ...sessionOptions,
    store: new DynamoDBStore({
      table: 'local-sessions',
      client: new AWS.DynamoDB({endpoint: new AWS.Endpoint('http://localhost:8000'), region: 'us-east-1'})
    })
  };
} else {
  // production session store config
  sessionOptions = {
    ...sessionOptions,
    store: new DynamoDBStore({
      table: 'express-sessions',
      reapInterval: 100000,
      readCapacityUnits: 10,
      writeCapacityUnits: 10,
      AWSConfigJSON: {
        region: 'eu-west-2'
      }
    })
  };
}

// session middleware
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, '../lib/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// csrf protection
app.use(csrf({cookie: false}));
app.use((req, res, next) => {
  // make the token avaialble to all render calls
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
