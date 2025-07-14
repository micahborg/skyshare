var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var statusRouter = require('./routes/status');
var turnRouter = require('./routes/turn');

var app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'https://skyshare.technology'],
  credentials: true,
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', statusRouter);
app.use('/api/turn', turnRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set response data, only providing stack trace in development
  const error = {
    message: err.message,
    status: err.status || 500
  };
  
  if (req.app.get('env') === 'development') {
    error.stack = err.stack;
  }

  res.status(err.status || 500);
  res.json(error);
});

module.exports = app;
