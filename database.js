/**
 * Database connection
 * @author Yousuf Kalim
 */
const mongoose = require("mongoose");
const db_url = process.env.MONGODB_URI;

// Setting
mongoose.set("debug", true);

// Connection
mongoose
  .connect(db_url, {
    // Some common settings (You don't need to understand these)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    ignoreUndefined: true,
  })
  .then(() => console.log("We are connected with database :)")) //Success
  .catch((err) => {
    console.log("DB Connection Error :( -------> ", err); //Failed
  });
