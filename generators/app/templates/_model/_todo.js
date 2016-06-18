'use strict';

const mongoose = require('../db/connector');

module.exports = mongoose.model('Todo', {
              		content: String,
              		status:Boolean
          		});
