<p align="center">
 <h2 align="center">Clinic Server</h2>
 <p align="center">An example of lightweight Web application that allows users to retrieve and send data. The code is written in <b>Node & Express.</b></p>
 <h3 align="left">Task</h3>
 <p align="left">
    - An API for creating account as a clinic user - Fields required: email, password, clinic name, phone number, address 
    <br>- An API for authenticating logins using email and password - An API for a clinic tocreate a consultation record 
    <br>- The record should include: clinic, doctor name, patient name, diagnosis, medication, consultation fee, date and time, has follow-up consultation or not 
    <br>- An API for getting a list of consultation records for a clinic
  </p>
</p>

# Features
- [Installation](#installation)
- [Building Locally](#building-locally)
- [Features](#features)
# Installation 
* [Node JS](https://nodejs.org/en/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
# Building locally

Clone the repo, and:

```md
$ npm install
```
Or you can run the development server with:

```md
$ npm start
```

_Note: Assume that your PC has setup the development enviroment properly.

### Setup Database

To start the API server, it is required to have the MySQL server running.

#### Import the Schema into MySQL server. 

> Tools: MySQL Workbench
```md
https://github.com/cestbon258/clinic-server/blob/master/clinic_db.sql
```

#### Configure database connection

Change some key parameters to connect MYSQL server in `db-connector.js`.
```md
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'clinic_db',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', // enable this line if using MAMP
	port: '3306'
```

#### Test database connection

To test connection of database.

```md
$ node db-connector-test.js
```

# Features

### User Registration

Required Filed 
- `email`
- `password`
- `clinic name` 
- `phone number`
- `Address`

### Login

Required Filed 
- `email`
- `password`

### Create Record

Required Filed 
- `email`
- `doctor name`
- `patient name`
- `diagnosis`
- `medication`
- `fee`
- `date` - _(2020-09-01)_
- `time`
- `follow up` - _(0 means No, 1 means Yes)_

### Get Records

To get data by using the query parameter `?email=<EMIAL>`.
```md
For example: http://localhost:3000/data/get?email=test@gmail.com
```
