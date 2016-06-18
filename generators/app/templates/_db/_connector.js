'use strict';

const mongoose = require('mongoose');
const keys = require('./../keys/keys.json');
mongoose.connect(keys.mongoose.url,err => {
    if (err) {
    	console.log(err);
    } else {
    	console.log('Connected to db');
    }
});
module.exports=mongoose;
