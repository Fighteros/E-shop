const mongoose = require('mongoose');
const { DB_URL } = require('./config');



const conn = async () => {
    return await mongoose.connect(DB_URL).then(
        console.log('Connected to db')
    );
}

module.exports = conn;