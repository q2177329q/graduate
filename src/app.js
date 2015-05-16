var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookie = require('cookie');
var cookieSignature = require('cookie-signature');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var routes = require('./routes/back');
var frontRoutes = require('./routes/student');
var teacherRouter = require('./routes/teacher');
var users = require('./routes/users');

var connectDb = require('./model/connect');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "limit":"10000kb"}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('quan'));

app.use(session({cookie:{
    maxAge:3600000
}}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(connectDb)
app.use(routes);
app.use(frontRoutes);
app.use('/teacher',teacherRouter)
app.use('/users', users);
console.log('k')
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000)
module.exports = app;
