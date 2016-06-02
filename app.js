var express = require('express');
var routes = require('./routes/index');

var app = express();

app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        error: err.status, message: err.message
    });
});

module.exports = app;
