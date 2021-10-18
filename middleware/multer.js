// init
const multer = require("multer");

// exporting multer disk storage middleware
module.exports = multer.diskStorage({
  // destination to save data
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  //   file naming convention
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
