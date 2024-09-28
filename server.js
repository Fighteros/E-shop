const express = require('express');
const { PORT, NODE_ENV } = require('./config/config');
const morgan = require('morgan');
const conn = require('./config/mongoose');
const mountRoutes = require('./routes/mountRoutes');
const globalError = require('./middlewares/errorMiddleware');
const ApiError = require('./utils/ApiError');

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


// Handle global errors 
app.use(globalError);

// handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ApiError('Can\'t find this path', 404))
})


// Server run 
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})

