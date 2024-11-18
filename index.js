const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
const database = require('./config/database');
database.connect();

const routeApiV1 = require('./api/v1/router/index.route');
routeApiV1(app);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});