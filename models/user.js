const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
   name: String,
   lastName: String,
   email: {
      type: String,
      unique: true,
   },
   password: String,
   role: String,
   active: Boolean,
});

module.exports = mongoose.model("User", userSchema);
