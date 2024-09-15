require('dotenv').config();


const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;


module.exports = { PORT, NODE_ENV, DB_URL }