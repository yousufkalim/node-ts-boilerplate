// Init
const mongoose = require("mongoose");
const db_url = process.env.MONGODB_URI;

// Setting
mongoose.set("debug", true);

// Connection
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    ignoreUndefined: true,
  })
  .then(() => console.log("We are connected with database :)"))
  .catch((err) => {
    console.log("DB Connection Error :( -------> ", err);
  });

// exporting models
module.exports = {
  User: require("./models/user"),
  // add more models here
};
