// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// Example Validation
exports.validateExample = [
  check("name").not().isEmpty().trim(),
  check("cnic").not().isEmpty().trim(),
  check("email").isEmail().trim(),
  check("password").not().isEmpty().trim().isLength({ min: 8 }),
  check("gender").not().isEmpty(),
  check("role").not().isEmpty(),
  check("number").not().isEmpty().trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send("Please fill all the required fields correctly");
  } else {
    next();
  }
};
