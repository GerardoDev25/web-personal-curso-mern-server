const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

// ? load rourtings

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ? configure headers http

// ? router basic

module.exports = app;
