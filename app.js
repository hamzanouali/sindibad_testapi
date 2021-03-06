var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var AuthRouter = require('./routes/auth');
var ApiAuthRouter = require('./routes/api/v1/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const tailwindPath = path.join(__dirname, './node_modules/tailwindcss/dist/')
app.use("/tailwindcss", express.static(tailwindPath));
const axiosPath = path.join(__dirname, './node_modules/axios/dist/')
app.use("/axios", express.static(axiosPath));

app.use('/api/v1/auth', ApiAuthRouter);
app.use('/auth', AuthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
