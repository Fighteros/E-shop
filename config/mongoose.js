const mongoose = require('mongoose');
const { DB_URL } = require('./config');


const connectDB = async () => {
    return await mongoose.connect(DB_URL)
        .then(
            console.log('Connected to db')
        ).catch((err) => {
            console.log('Connection to db failed', err);
        });
}


module.exports = connectDB;