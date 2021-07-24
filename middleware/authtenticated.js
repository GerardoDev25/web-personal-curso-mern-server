const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "fTd7E12STOesunAClabaSecRetAf13DsHff";

// ? function that blocked users no login

exports.ensureAuth = (req, res, next) => {
   if (!req.headers.authorization) {
      return res.status(403).send({
         message:
            "the query don't have headers of authorization",
      });
   }

   const token = req.headers.authorization.replace(/['"]+/g, "");

   try {
      var payload = jwt.decode(token, SECRET_KEY);

      if (payload.exp <= moment.unix()) {
         return res
            .status(404)
            .send({ message: "token expired" });
      }
   } catch (ex) {
      console.error(ex);
      return res
         .status(404)
         .send({ message: "Token Invalided" });
   }

   req.user = payload;
   next();
};
