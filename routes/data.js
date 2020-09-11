var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var connection = require('../db-connector');

/* create record */
router.post('/create', async (req, res, next) => {

    // check empty
    if (!req.body.email) {
        // return res.status(200).json({ success: false, data: {message: ''} });
        return res.status(200).json({ success: false, data: {message: 'Email cannot be empty.'} });
    }

    if (!req.body.doctorName) {
        return res.status(200).json({ success: false, data: {message: 'Doctor name cannot be empty.'} });
    }

    if (!req.body.patientName) {
        return res.status(200).json({ success: false, data: {message: 'Patient name cannot be empty.'} });
    }

    if (!req.body.diagnosis) {
        return res.status(200).json({ success: false, data: {message: 'Diagnosis cannot be empty.'} });
    }

    if (!req.body.medication) {
        return res.status(200).json({ success: false, data: {message: 'Dedication cannot be empty.'} });
    }

    if (!req.body.fee) {
        return res.status(200).json({ success: false, data: {message: 'Dedication fee cannot be empty.'} });
    }

    if (!req.body.date) {
        return res.status(200).json({ success: false, data: {message: 'Date cannot be empty.'} });
    }

    if (!req.body.time) {
        return res.status(200).json({ success: false, data: {message: 'Time cannot be empty.'} });
    }

    if (!req.body.followUp) {
        return res.status(200).json({ success: false, data: {message: 'Follow-up consultation cannot be empty.'} });
    }


    // check user exist in DB?
    try{
        var query = 'SELECT id AS user_id, email FROM clinic_users WHERE email = ? LIMIT 1';
		connection.query(query, [req.body.email], function (error, results, fields) {
            if (error) throw error;

            if (results[0]) {
                // user exist return

                var userID = results[0].user_id;
                var record = [userID, req.body.doctorName, req.body.patientName, req.body.diagnosis, req.body.medication, req.body.fee, req.body.date, req.body.time, req.body.followUp];

                var sql = 'INSERT INTO records (clinic_id, doctor_name, patient_name, diagnosis, medication, fee, date, time, follow_up) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(sql, record, function (error, results, fields) {
                    if (error) throw error;
                    return res.status(200).json({ success: true, data: {message: 'Record created.'} });
        		});

            } else {
                // user id does not exist in DB

                return res.status(200).json({ success: false, data: {message: 'This account cannot get consultation record.'} });
            }
		});
	} catch (err) {
		console.log(err);
	}
});


/* Get all records. */
// for example:  http://localhost:3000/data/get?email=test@gmail.com
router.get('/get', async (req, res, next) => {
    // get query string
    var email = req.query.email; // $_GET["email"]

    // to get consultation records
    if (email) {
        try{
            var query = 'SELECT id AS user_id, email FROM clinic_users WHERE email = ? LIMIT 1';
    		connection.query(query, [email], function (error, results, fields) {
                if (error) throw error;

                if (results[0]) {
                    // user exist return

                    var userID = results[0].user_id;

                    var sql = 'SELECT * FROM records WHERE clinic_id = ?';
                    connection.query(sql, userID, function (error, results, fields) {
                        if (error) throw error;
                        // console.log(results);
                        return res.status(200).json({ success: true, data: {message: results} });
            		});

                } else {
                    // user id does not exist in DB
                    return res.status(200).json({ success: false, data: {message: 'This account cannot get consultation record.'} });
                }
    		});
    	} catch (err) {
    		console.log(err);
    	}
        console.log(email);
    } else {
        return res.status(200).json({ success: false, data: {message: 'Parameter is missing. Please check.'} });
    }
});

module.exports = router;
