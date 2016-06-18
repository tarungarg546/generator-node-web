'use strict';

const mongoose = require('mongoose');
const keys = require('./../keys/keys.js');
mongoose.connect(keys.mongoose.url,err => {
    if (err) {
    	console.log(err);
    } else {
    	console.log('Connected to db');
    }
});
module.exports=mongoose;
