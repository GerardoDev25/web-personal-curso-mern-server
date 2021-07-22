const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "fTd7E12STOesunAClabaSecRetAf13DsHff";

// ? funtion that create a token accesset
exports.createAccesstToken = function (user) {
   const payload = {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      createToken: moment().unix(),
      exp: moment().add(3, "hours").unix(),
   };

   return jwt.encode(payload, SECRET_KEY);
};

// ? funtion that refresh the token access
exports.createRefreshToken = function (user) {
   const payload = {
      id: user._id,
      exp: moment().add(30, "days").unix(),
   };

   return jwt.encode(payload, SECRET_KEY);
};

// ? funtion that decode the token
exports.decodeToken = function (token) {
   return jwt.decode(token, SECRET_KEY);
};
