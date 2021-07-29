// Init
require("dotenv").config();
const app = require("express")();
const port = process.env.PORT || 5000;
require("./database");

// Middleware
require("./middleware/common")(app);

// Routes
app.use("/api", require("./routes"));

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});
