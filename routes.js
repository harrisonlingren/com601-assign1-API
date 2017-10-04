var express = require('express');
var router = express.Router();

// default
router.get('/', (req, res) => {
    // welcome message and 204 status
    console.log('got connection!')
    res.status(200).send('Welcome to the assignment 1 API!');
});

// get booking
router.get('/booking/:id', (req, res) => {
    // search ID from req params
    let found = false;
    let searchId = req.params.id;

    let foundObj = findBookingById(searchId);
    found = !!foundObj;

    // return 200 and send json if present. 
    // otherwise, send 404 and 'not found'
    if (found) {
        let resData = {
            'message': 'Found record!',
            'data': foundObj
        }
        res.status(200).json(resData);
    } else {
        let resData = {
            'message': 'Error: booking ' + searchId + ' was not found',
            'data': null
        }
        res.status(404).json(resData);
    }
});

router.post('/create', (req, res) => {
    console.log('create req', req.body);
    let recvObj = {
        'first': req.body.first,
        'last': req.body.last,
        'email': req.body.email
    };
    // TODO: insert new booking, return created ID
    let newObj = createNewBooking(recvObj);
    resData = {
        'message': 'Record created!',
        'data': newObj
    }
    res.status(201).json(resData);
});

// search db for a booking by ID
function findBookingById(id) {
    // TODO: add db search here
    if (id == '1') {
        return {
            'id': 1,
            'first': 'Joe',
            'last': 'Schmoe',
            'email': 'lameboi45@gmail.com'
        }
    } else {
        return null;
    }
}

// insert new booking and return created object
function createNewBooking(bookingObj) {
    // TODO: add db stuff here
    let newId = 0;
    let newObj = {
        'id': newId,
        'first': bookingObj.first,
        'last': bookingObj.last,
        'email': bookingObj.email
    }
    return newObj
}

module.exports = router;