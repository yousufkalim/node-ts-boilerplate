// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// Example Validation
exports.validateExample = [
  check("name", "Name is required.").notEmpty().trim(),
  check("cnic", "CNIC is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("gender", "Gender is required.").notEmpty(),
  check("role", "Role is required.").notEmpty(),
  check("number", "Number is required.").notEmpty().trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  } else {
    next();
  }
};
