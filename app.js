const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");

const { API_VERSION } = require("./config");

const app = express();

// ? load Routers
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // ?use cors
// app.use(cors());

// ? configure headers http
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
   );
   res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
   );
   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
   next();
});

// ? router basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
