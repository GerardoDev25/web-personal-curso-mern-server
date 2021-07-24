const bcryt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");

// ? funtion that create a new user
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

// ? funtion make login user
function signIn(req, res) {
   const params = req.body;

   const email = params.email.toLowerCase();
   const password = params.password;

   // * find a user with that email
   User.findOne({ email }, (err, userStore) => {
      // * if user exist

      if (err) {
         res.status(500).send({
            message: "Server Error",
         });
      } else {
         if (!userStore) {
            res.status(404).send({
               message: "User not found",
            });
         } else {
            // * compare the password matched

            bcryt.compare(
               password,
               userStore.password,
               (err, checked) => {
                  if (err) {
                     res.status(500).send({
                        message: "Server error",
                     });
                  } else if (!checked) {
                     res.status(404).send({
                        message: "user or password incorrect",
                     });

                     // * compare that user is active
                  } else {
                     if (!userStore.active) {
                        res.status(200).send({
                           code: 200,
                           message: "user isen't active",
                        });

                        // * return the tokens if all is fine
                     } else {
                        res.status(200).send({
                           accessToken:
                              jwt.createAccesstToken(userStore),
                           refreshToken:
                              jwt.createRefreshToken(userStore),
                        });
                     }
                  }
               }
            );
         }
      }
   });
}

// ? funtion that return a list users
function getUsers(req, res) {
   User.find().then((Users) => {
      if (!Users) {
         res.status(404).send({
            message: "User not found",
         });
      } else {
         res.status(200).send({
            Users,
         });
      }
   });
}

// ? funtion that return all users active
function getUsersActive(req, res) {
   const query = req.query;

   User.find({ active: query.active }).then((Users) => {
      if (!Users) {
         res.status(404).send({
            message: "User not found",
         });
      } else {
         res.status(200).send({
            Users,
         });
      }
   });
}

module.exports = {
   signUp,
   signIn,
   getUsers,
   getUsersActive,
};
