const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const { API_VERSION } = require("./config");

const app = express();

// ? load Routers
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");

// ?use cors
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ? configure headers http

// ? router basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
