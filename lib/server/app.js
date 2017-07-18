const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const csrf = require('csurf');
const session = require('express-session');
const DynamoDBStore = require('dynamodb-store');
const index = require('./routes/index');
const assets = require('./assets.json');

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
  },
  resave: false,
  saveUninitialized: false,
};

// Redundant path to work on both local and cloud environments
app.use('/static', express.static(path.join(__dirname, '../../.dist/client')));

if (app.get('env') === 'development') {
  // local dynamo session store
  sessionOptions = {
    ...sessionOptions,
    store: new DynamoDBStore({
      table: {
        name: 'local-sessions',
        readCapacityUnits: 10,
        writeCapacityUnits: 10,
      },
      dynamoConfig: {
        accessKeyId: 'local',
        secretAccessKey: 'local',
        region: 'eu-west-2',
        endpoint: 'http://localhost:8000',
      },
      ttl: 600000,
    }),
  };
} else {
  // production session store config
  sessionOptions = {
    ...sessionOptions,
    store: new DynamoDBStore({
      table: {
        name: 'new-sessions',
        readCapacityUnits: 10,
        writeCapacityUnits: 10,
      },
      ttl: 600000,
    }),
  };
}

// session middleware
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, '../server/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// csrf protection
app.use(csrf({ cookie: false }));
app.use((req, res, next) => {
  // make the token avaialble to all render calls
  res.locals.csrfToken = req.csrfToken();
  res.locals.assets = assets;
  next();
});

// route
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
