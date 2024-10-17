const mongoose = require('mongoose');
const { DB_URL } = require('./config');



const conn = async () => await mongoose.connect(DB_URL,
    {
        dbName: 'E-shop'
    }

).then(
    console.log('Connected to db')
)

module.exports = conn;