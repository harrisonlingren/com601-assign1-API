var express = require('express');
var router = express.Router();

// default
router.get('/', function(req, res) {
    // welcome message and 204 status
    console.log('got connection!')
    res.status(200).send('Welcome to the assignment 1 API!');
});

// get booking
router.get('/booking/:id', function(req, res) {
    // search ID from req params
    let found = false;
    let searchId = req.params.id;

    let foundObj = findBookingById(searchId);
    found = !!foundObj;

    // return 200 and send json if present. 
    // otherwise, send 404 and 'not found'
    if (found) {
        res.status(200).json(foundObj);
    } else {
        res.status(404).send('Error: booking ' + searchId + ' was not found')
    }
});

// search db for a booking by ID
function findBookingById(id) {
    if (id == '1') {
        return {
            'first': 'Joe',
            'last': 'Schmoe',
            'email': 'lameboi45@gmail.com'
        }
    } else {
        return null;
    }
}

module.exports = router;