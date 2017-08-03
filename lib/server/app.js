const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csrf = require('csurf');
const sessions = require('client-sessions');
const index = require('./routes/index');
const assets = require('./assets.json');

const app = express();

// trust proxy headers
app.set('trust proxy', true);

app.use(cookieParser());

// helmet basic setup
app.use(helmet());

app.use(
  sessions({
    cookieName: 'session',
    secret: 'G§yjV+{Ñ¬NÎÖ%±#Ë"ÈÑ)áÏhCµÚR÷ÿdvä#$KWó¦Ð}4áÞÕ+?îq«WKyÚÅýñîs-ûÅÖÜ¸',
    duration: 1 * 60 * 60 * 1000, // 1 hour
    activeDuration: 1000 * 60 * 5, // 15 minutes
    cookie: {
      path: '/',
      ephemeral: true,
      httpOnly: true,
      secure: app.get('env') === 'development', // false on prd. secureProxy takes care of it.
      secureProxy: true,
    },
  }),
);

app.use((req, res, next) => {
  if (!req.session.sessionCreated) {
    // setting a property will automatically cause a Set-Cookie response
    req.session.sessionCreated = true;
  }
  return next();
});

// csrf protection
app.use(
  csrf({
    cookie: { httpOnly: true, secure: true, sameSite: true },
  }),
);
app.use((req, res, next) => {
  // make the token avaialble to all render calls
  res.locals.csrfToken = req.csrfToken();
  // make webpack assets hash available to all render calls
  res.locals.assets = assets;
  next();
});

// Redundant path to work on both local and cloud environments
app.use('/static', express.static(path.join(__dirname, '../../.dist/client')));

// view engine setup
app.set('views', path.join(__dirname, '../server/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
