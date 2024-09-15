const express = require('express');
const { PORT, NODE_ENV } = require('./config/config');
const morgan = require('morgan');
const connectDB = require('./config/mongoose');


const app = express();

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode ${NODE_ENV}`);
}

connectDB();

app.get('/', (req, res) => {
    res.send('Our API')
})


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})

