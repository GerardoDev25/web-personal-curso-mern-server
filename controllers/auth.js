const jwt = require("../services/jwt");
const User = require("../models/user");
const moment = require("moment");

function willExpiredToken(token) {
   const { exp } = jwt.decodeToken(token);
   const currentDate = moment().unix();

   return currentDate > exp ? true : false;
}

function refreshAccessToken(req, res) {
   const { refreshToken } = req.body;
   const isTokenExpired = willExpiredToken(refreshToken);

   // * check the token expired
   if (isTokenExpired) {
      res.status(404).send({ message: "refreshToken Expired" });
   } else {
      //
      // * get token id and find the user
      const { id } = jwt.decodeToken(refreshToken);
      User.findOne({ _id: id }, (err, userStore) => {
         if (err) {
            res.status(500).send({ message: "Server Error" });

            // * if user exit make ...
         } else {
            if (!userStore) {
               res.status(404).send({
                  message: "User not Found",
               });
            } else {
               //
               // * if all is fine then send new tokens
               res.status(200).send({
                  accessToken: jwt.createAccesstToken(userStore),
                  refreshToken,
               });
            }
         }
      });
   }
}

module.exports = {
   //    willExpiredToken,
   refreshAccessToken,
};
