var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var loginSuccessRouter = require('./routes/login-success');
var registerRouter = require('./routes/register');
var registerSuccessRouter = require('./routes/register-successful');
var welcomeRouter = require('./routes/welcome');
var chatRouter = require('./routes/chat');
var docsRouter = require('./routes/docslist');
var usersRouter = require('./routes/user-list');
var shareRouter = require('./routes/share');
var editUserRouter = require('./routes/edit-users');
var logoutRouter = require('./routes/logout');


//CONNECT TO DB
const JWT_SECRET = process.env.jwt;
const MONGODB_URL = process.env.mongodb;
mongoose.connect(MONGODB_URL);
console.log(JWT_SECRET);
console.log(MONGODB_URL);




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/login-success', loginSuccessRouter);
app.use('/', registerRouter);
app.use('/register-successful', registerSuccessRouter);
app.use('/welcome', welcomeRouter);
app.use('/chat', chatRouter);
app.use('/docslist', docsRouter);
app.use('/user-list', usersRouter);
app.use('/edit-users', editUserRouter);
app.use('/logout', logoutRouter);
app.use('/share', shareRouter);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
