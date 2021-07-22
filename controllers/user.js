const bcryt = require("bcrypt-nodejs");
const User = require("../models/user");

function signUp(req, res) {
   const user = new User();

   const { name, lastName, email, password, password2 } =
      req.body;

   user.name = name;
   user.lastName = lastName;
   user.email = email.toLowerCase();
   user.role = "admin";
   user.active = false;

   // ? validate the info of the req
   if (!password || !password2)
      res.status(404).send({
         message: "the passwords are obligatory",
      });
   else if (password !== password2)
      res.status(404).send({
         message: "the passwords aren't match",
      });
   else
      bcryt.hash(password, null, null, (err, hash) => {
         if (err)
            res.status(500).send({
               message: "Error to encrypt the password",
            });
         else {
            user.password = hash;
            user.save((error, userStore) => {
               if (error)
                  res.status(500).send({
                     message:
                        "Error the user with that email already exists",
                  });
               else if (!userStore)
                  res.status(404).send({
                     message: "Error to create the user",
                  });
               else
                  res.status(200).send({
                     user: userStore,
                     message: "user created",
                  });
            });
         }
      });
}

module.exports = {
   signUp,
};
