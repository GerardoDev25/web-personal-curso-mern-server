const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

// ? connent to data base
mongoose.set("useFindAndModify", false);
mongoose.connect(
   `mongodb://${IP_SERVER}:${PORT_DB}/gerardomiranda`,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   },
   (err, res) => {
      if (err) {
         throw err;
      } else {
         console.log(
            "la coneccion a la base de datos es correcta"
         );
         app.listen(PORT_SERVER, () => {
            console.log("*******************");
            console.log("***** API REST *****");
            console.log("*******************");
            console.log(
               `http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`
            );
         });
      }
   }
);
