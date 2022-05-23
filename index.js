const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
const db = require('./middlewares/db');
const app = express();
const cors = require('cors');

// Middlewares 
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

cors();

// routes
const projectApi = require('./routes/projects');

// routes connection
app.use('/api', projectApi)

// DB connection
db();

// Server 
const port  = process.env.PORT || 5000;
app.listen(port, () => {
    return logger.info("Running on port: " + port);
});

module.exports = app;