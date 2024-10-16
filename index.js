const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const mongoose = require('mongoose');

const database = require('./config/database');
database.connect();

const routeApiV1 = require('./api/v1/router/index.route');
routeApiV1(app);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});