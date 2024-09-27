const express = require('express');
const { PORT, NODE_ENV } = require('./config/config');
const morgan = require('morgan');
const conn = require('./config/mongoose');
const mountRoutes = require('./routes/mountRoutes');
const customErrorHandle = require('./middlewares/customErrorHandle');

// Express
const app = express();

app.use(express.json());
// middlewares
if (NODE_ENV === 'development') {
    // Log http requests in console in development mode 
    // Helps in debugging 
    app.use(morgan('dev'));
    console.log(`mode: ${NODE_ENV}`);
}

// Connection to db
conn();

// Routes
mountRoutes(app);

// handle errors 
app.use(customErrorHandle);

// Retunr not found to any not known path
app.use('*', (req, res, next) => {
    return res.status(404).json();
})
// Server run 
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})

