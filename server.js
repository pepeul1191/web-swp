var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(function (req, res, next) {
  res.set('Server', 'Ubuntu');
  res.set('Access-Control-Allow-Origin', '*');
  return next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.listen(9090);
console.log('Listening on port 9090');