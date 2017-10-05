var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var db_conn_str = process.env.DB_CONN_STR || null;
if (!db_conn_str) {
    console.error('DB_CONN_STR variable was not set!');
}

// default
router.get('/', (req, res) => {
    // welcome message and 204 status
    console.log('got connection!')
    res.status(200).send('Welcome to the assignment 1 API!');
});

// READ method
router.get('/booking/:id', (req, res) => {
    // search ID from req params
    id = parseInt(req.params.id);
    console.log('searchId: ', id);

    // connect to db
    MongoClient.connect(db_conn_str, (err, db) => {
        assert.equal(null, err);
        console.log('searching for id: %s', id);

        db.collection('bookings').findOne({ book_id: id }, (err, result) => {
            assert.equal(null, err);

            if (!result) {
                let resData = {
                    'message': 'Error: booking ' + id + ' not found',
                    'data': null
                }; res.status(404).json(resData);

            } else {
                console.log('result found: ', result);
                assert.equal(id, result.book_id);
                
                let resData = {
                    'message': 'Record found!',
                    'data': result
                }; res.status(200).json(resData);
            }

            db.close();
        });
    });
});

// CREATE method
router.post('/create', (req, res) => {
    console.log('create req', req.body);
    let recvObj = {
        'book_id': 0,
        'first': req.body.first,
        'last': req.body.last,
        'email': req.body.email
    };
    // creates a new booking and returns the object data
    // connect to db
    MongoClient.connect(db_conn_str, (err, db) => {
        assert.equal(null, err);
        console.log('Connected to db successfully');

        // increment book_id
        let newId = 0;
        db.collection('bookings').count((err, count) => {
            assert.equal(null, err);
            console.log("count: ", count);
            newId = count;
            recvObj.book_id = newId;

            // insert into db
            db.collection('bookings').insertOne(recvObj, (err, r) => {
                assert.equal(null, err);
                assert.equal(1, r.insertedCount);

                // send response
                resData = {
                    'message': 'Record created!',
                    'data': recvObj
                }; res.status(201).json(resData);

                db.close();
            });
        });
    });
});

module.exports = router;