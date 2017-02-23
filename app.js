express = require('express');
mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://admin:sa1234@ds157439.mlab.com:57439/town_office');
autoIncrement.initialize(mongoose.connection);

var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var form_details_model = require('./models/form_details');
var user_model = require('./models/user');
var index = require('./routes/index');
var users = require('./routes/users');
var form_details_route = require('./routes/form_details')(form_details_model);
var user_route = require('./routes/user')(user_model);
var app = express();


// view engine setup
/*app.set('views', path.join(__dirname, 'views'));*/


var cors = require('cors');

app.use(cors());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/app')));


app.use('/', index);
app.use('/users', users);
app.use('/api/form_details', form_details_route);
app.use('/api/users', user_route);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

// listen (start app with node server.js) ======================================
