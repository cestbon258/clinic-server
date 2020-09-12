var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var validator = require("email-validator");

var connection = require('../db-connector');

// var cors = require('cors');
// router.options('/', cors())

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
        return res.status(200).json({ success: false, data: {message: 'Email cannot be empty.'} });
    } else {
        var isEmailFormat = validator.validate(req.body.email); // true
        if (!isEmailFormat) {
            return res.status(200).json({ success: false, data: {message: 'Please validate your email.'} });
        }
    }

    if (!req.body.password) {
        return res.status(200).json({ success: false, data: {message: 'Password cannot be empty.'} });
    }

    if (!req.body.clinicName) {
        return res.status(200).json({ success: false, data: {message: 'Clinic name cannot be empty.'} });
    }

    if (!req.body.phoneNumber) {
        return res.status(200).json({ success: false, data: {message: 'Phone number cannot be empty.'} });
    }

    if (!req.body.address) {
        return res.status(200).json({ success: false, data: {message: 'Address cannot be empty.'} });
    }

    // check user exist in DB?
    try{
        var query = 'SELECT id AS user_id, email FROM clinic_users WHERE email = ? LIMIT 1';
		connection.query(query, [req.body.email], function (error, results, fields) {
            if (error) throw error;

            if (results[0]) {
                // user exist return
                return res.status(200).json({ success: false, data: {message: 'This email has been token. Please use another one!'} });

            } else {
                // create new user

                // password hash
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                var user = [req.body.email, hash, req.body.clinicName, req.body.phoneNumber, req.body.address];

                var sql = 'INSERT INTO clinic_users (email, password, clinic_name, phone_number, address) VALUES (?, ?, ?, ?, ?)';
                connection.query(sql, user, function (error, results, fields) {
                    if (error) throw error;
                    return res.status(200).json({ success: true, data: {email: req.body.email} });
        		});

            }
		});
	} catch (err) {
		console.log(err);
	}
});


/* User login. */
router.post('/login', async (req, res, next) => {
    console.log('try login!');
    // check empty
    if (!req.body.email) {
        return res.status(200).json({ success: false, data: {message: 'Email cannot be empty.'} });
    } else {
        var isEmailFormat = validator.validate(req.body.email); // true
        if (!isEmailFormat) {
            return res.status(200).json({ success: false, data: {message: 'Please validate your email.'} });
        }
    }

    if (!req.body.password) {
        return res.status(200).json({ success: false, data: {message: 'Password cannot be empty.'} });
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
                    return res.status(200).json({ success: true, data: {email: req.body.email} });
                } else {
                    return res.status(200).json({ success: false, data: {message: 'Wrong password.'} });
                }
            } else {
                // user does not exist in DB
                return res.status(200).json({ success: false, data: {message: 'This account does not exist!'} });
            }
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
