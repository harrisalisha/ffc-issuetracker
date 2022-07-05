const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URL);
console.log('connected to database');
module.exports = db;
