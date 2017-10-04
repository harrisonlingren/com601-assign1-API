let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config()

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// connect to db here, handle successful and failed conns
// let mongoose = require('mongoose');
// let db_string = (process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_TABLE);
// mongoose.connect(db_string);
// let db = mongoose.connection

// let bookingModel = require('models.js')(mongoose);
let appRoutes = require('./routes.js');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', appRoutes);

let port = process.env.PORT || 8080
let server = app.listen(port, function() {
    console.log('Listening on port %s...', server.address().port);
});