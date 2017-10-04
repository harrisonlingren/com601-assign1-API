let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config()

let app = express();

// connect to db here, handle successful and failed conns
// let mongoose = require('mongoose');
// let db_string = (process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_TABLE);
// mongoose.connect(db_string);
// let db = mongoose.connection

// let bookingModel = require('models.js')(mongoose);

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
};
let appRoutes = require('./routes.js');

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appRoutes);

let port = process.env.PORT || 8080
let server = app.listen(port, function() {
    console.log('Listening on port %s...', server.address().port);
});

