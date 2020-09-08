var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var connection = require('../db-connector');


// db connection
// try {
// 	connection.connect();
// } catch {
// 	console.log ("Please start your apache server!");
// }

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('index');
});


/* Create user. */
router.post('/signup', async (req, res, next) => {

    // check empty
    if (!req.body.email) {
        res.send(JSON.stringify({"result" : "Email cannot be empty."}));
    }

    if (!req.body.password) {
        res.send(JSON.stringify({"result" : "Password cannot be empty."}));
    }

    if (!req.body.clinicName) {
        res.send(JSON.stringify({"result" : "Clinic name cannot be empty."}));
    }

    if (!req.body.phoneNumber) {
        res.send(JSON.stringify({"result" : "Phone number cannot be empty."}));
    }

    if (!req.body.address) {
        res.send(JSON.stringify({"result" : "Address cannot be empty."}));
    }

    // check user exist in DB?
    try{
        var query = 'SELECT id AS user_id, email FROM clinic_users WHERE email = ? LIMIT 1';
		connection.query(query, [req.body.email], function (error, results, fields) {
            if (error) throw error;

            if (results[0]) {
                // user exist return
                res.send(JSON.stringify({"result" : "This email has been token. Please use another one!"}));

            } else {
                // create new user

                // password hash
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                var user = [req.body.email, hash, req.body.clinicName, req.body.phoneNumber, req.body.address];

                var sql = 'INSERT INTO clinic_users (email, password, clinic_name, phone_number, address) VALUES (?, ?, ?, ?, ?)';
                connection.query(sql, user, function (error, results, fields) {
                    if (error) throw error;
                    res.send(JSON.stringify({"result" : {email: req.body.email}}));
        		});

            }
		});
	} catch (err) {
		console.log(err);
	}
});


/* User login. */
router.post('/login', async (req, res, next) => {

    // check empty
    if (!req.body.email) {
        res.send(JSON.stringify({"result" : "Email cannot be empty."}));
    }

    if (!req.body.password) {
        res.send(JSON.stringify({"result" : "Password cannot be empty."}));
    }

    // check user exist in DB?
    try{
        var query = 'SELECT id AS user_id, email, password FROM clinic_users WHERE email = ? LIMIT 1';
		connection.query(query, [req.body.email], function (error, results, fields) {
            if (error) throw error;

            if (results[0]) {
                // user exist return

                // compare passwords
                var dbPassword = results[0].password;
                var isAuth = bcrypt.compareSync(req.body.password, dbPassword);

                if (isAuth) {
                    res.send(JSON.stringify({"result" : {email: req.body.email}}));
                } else {
                    res.send(JSON.stringify({"result" : 'Wrong password.'}));
                }
            } else {
                // user does not exist in DB

                res.send(JSON.stringify({"result" : "This account does not exist."}));
            }
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
