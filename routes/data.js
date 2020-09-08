var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var connection = require('../db-connector');

/* create record */
router.post('/create', async (req, res, next) => {

    // check empty
    if (!req.body.email) {
        res.send(JSON.stringify({"result" : "Email cannot be empty."}));
    }

    if (!req.body.doctorName) {
        res.send(JSON.stringify({"result" : "Doctor name cannot be empty."}));
    }

    if (!req.body.patientName) {
        res.send(JSON.stringify({"result" : "Patient name cannot be empty."}));
    }

    if (!req.body.diagnosis) {
        res.send(JSON.stringify({"result" : "Diagnosis cannot be empty."}));
    }

    if (!req.body.medication) {
        res.send(JSON.stringify({"result" : "Dedication cannot be empty."}));
    }

    if (!req.body.fee) {
        res.send(JSON.stringify({"result" : "Dedication fee cannot be empty."}));
    }

    if (!req.body.date) {
        res.send(JSON.stringify({"result" : "Date cannot be empty."}));
    }

    if (!req.body.time) {
        res.send(JSON.stringify({"result" : "Time cannot be empty."}));
    }

    if (!req.body.followUp) {
        res.send(JSON.stringify({"result" : "Follow-up consultation cannot be empty."}));
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
                    res.send(JSON.stringify({"result" : 'Record created.'}));
        		});

            } else {
                // user id does not exist in DB

                res.send(JSON.stringify({"result" : "This account cannot create consultation record."}));
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
                        res.send(JSON.stringify({"result" : results}));
            		});

                } else {
                    // user id does not exist in DB

                    res.send(JSON.stringify({"result" : "This account cannot get consultation record."}));
                }
    		});
    	} catch (err) {
    		console.log(err);
    	}
        console.log(email);
    } else {
        res.send(JSON.stringify({"result" : "Parameter is missing. Please check."}));
    }
});

module.exports = router;
