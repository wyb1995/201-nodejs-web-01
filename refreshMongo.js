const {refreshMongo} = require('./mongoTool');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/supermarket');

refreshMongo();

mongoose.connection.close();
