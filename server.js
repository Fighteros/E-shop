const express = require('express');
const { PORT, NODE_ENV } = require('./config/config');
const morgan = require('morgan');
const connectDB = require('./config/mongoose');
const mountRoutes = require('./routes/mountRoutes');
const customErrorHandle = require('./middlewares/customErrorHandle');

// Express
const app = express();

app.use(express.json());
// middlewares
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode ${NODE_ENV}`);
}

// Connection to db
connectDB();

// Routes
mountRoutes(app);

// handle errors 
app.use(customErrorHandle);
// Server run 
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})

