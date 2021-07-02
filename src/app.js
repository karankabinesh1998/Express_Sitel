const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const responseTime = require('response-time');
const fileUpload = require('express-fileupload');


const path = require('path');
const routes = require('./routes');

const helmet = require('helmet')


require('./helpers/databaseConnection');


// const { errorHandler, notFound } = require('./middlewares');

// Initialize server
const app = express();

// app.use(helmet());
// app.use(helmet.frameguard({ action: 'deny' }));
// app.use(helmet.dnsPrefetchControl({ allow: true }));
// app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
// app.use(helmet.hsts({ maxAge: 5184000 }));



// app.use(express.static(path.resolve('./logs')));

// App middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(responseTime());
app.use(fileUpload());



// App routes
app.use(routes);


module.exports = app;
